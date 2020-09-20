import { mapState } from "vuex"

export default {
  computed:{
    ...mapState({
        marks: state => state.newGrades.marks,
        weights: state => state.newGrades.weights,
        descriptions: state => state.newGrades.descriptions,
        dates: state => state.newGrades.dates,
    }),
  },
  methods:
  {
      //colors grades
      gradeWeightColor(oneStudentMarks, oneStudentsWeights) {

          //adds new classes to divs with grades, what causes coloring them on green, yellow or red
          let content = "";

          for (let i = 0; i < oneStudentMarks.length; i++) {
              if(oneStudentMarks[i]!==""){
                    if (oneStudentsWeights[i] == 1) {
                        content += `<div class="gradeWeightColor gradeWeightGreen">${oneStudentMarks[i]}</div>`
                    } else if (oneStudentsWeights[i] == 2) {
                        content +=  `<div class="gradeWeightColor gradeWeightYellow">${oneStudentMarks[i]}</div>`
                    } else if (oneStudentsWeights[i] == 3) {
                        content +=  `<div class="gradeWeightColor gradeWeightRed">${oneStudentMarks[i]}</div>`
                    }
                    else if(oneStudentsWeights[i]==""){
                      content +=  `<div class="gradeWeightColor">${oneStudentMarks[i]}</div>`
                    }
              }
              else if(oneStudentMarks[i]==""){
                if(oneStudentsWeights[i]===1){
                  content +=  `<div class="gradeWeightColor gradeWeightGreen"> </div>`
                }
                else if(oneStudentsWeights[i]===2){
                  content +=  `<div class="gradeWeightColor gradeWeightYellow"> </div>`
                }
                else if(oneStudentsWeights[i]===3){
                  content +=  `<div class="gradeWeightColor gradeWeightRed"> </div>`
                }
              }
          }

          return content

      },

      //shows tooltip after hovering on every grade
      showTooltip(RootElement, SingleStudent) {

      const gradeInDiv = RootElement.querySelectorAll("div.gradeWeightColor");

      for(let j=0; j<SingleStudent.marks.length;j++){

        if((SingleStudent.marks[j]!=="")&&(SingleStudent.weights[j]!=="")){


              if(SingleStudent.descriptions[j]===""){
                SingleStudent.descriptions[j] = "BRAK OPISU"
              }

              //gradeInDiv[0], gradeInDiv[1] ,gradeInDiv[2], gradeInDiv[3],
              gradeInDiv[j].addEventListener("mouseenter", function() {
                  this.canvas(SingleStudent.marks[j], SingleStudent.weights[j], SingleStudent.descriptions[j], SingleStudent.dates[j], gradeInDiv[j])
              }.bind(this), false);

              //destroyes tooltip after leaving
              gradeInDiv[j].addEventListener("mouseleave", function() {
                  const canv = document.querySelector("canvas");
                  canv.parentNode.removeChild(canv);
              });

          }

        }

      },

      //draws tooltip
      canvas(SingleGrade, SingleWeight, SingleDescription, SingleDate, anotherDivWithGrade) {

          const canvas = document.createElement("CANVAS");
          anotherDivWithGrade.appendChild(canvas);

          const canv = document.querySelector("canvas");
          const ctx = canv.getContext("2d");

          canvas.style['z-index'] = 2;
          canvas.style.position = 'absolute';
          canvas.style.padding = 0;
          canvas.style.border = 0;

          ctx.beginPath();
          ctx.moveTo(0, 10);
          ctx.lineTo(25, 15);
          ctx.lineTo(255, 15);
          ctx.lineTo(255, 135);
          ctx.lineTo(25, 135);
          ctx.lineTo(25, 40);
          ctx.lineTo(0, 10);
          ctx.stroke();
          ctx.fillStyle = "#ffeab0";
          ctx.fill();
          ctx.fillStyle = "black";
          ctx.font = "normal bold 14px Arial";

          ctx.fillText(`Ocena: ${SingleGrade}`, 40, 50);
          ctx.fillText(`Waga: ${SingleWeight } `, 40, 70);

          if(SingleDescription == "BRAK OPISU"){
            ctx.fillText(`Opis:`, 40, 90);
            ctx.font = "italic bold 14px Arial";
            ctx.fillText(`${SingleDescription}`, 85, 90);
            ctx.font = "normal bold 14px Arial";
          }
          else{
            ctx.fillText(`Opis: ${SingleDescription } `, 40, 90);
          }

          ctx.fillText(`Data: ${SingleDate}`, 40, 110);

      },

      //returns grades' average
      avg(oneStudentMarksArray, oneStudentWeightsArray) {

          let MarksSuperValue = 0;
          let weightSum = 0;


          for (let i = 0; i < oneStudentMarksArray.length; i++) {
            if((oneStudentMarksArray[i]!=="") && (oneStudentWeightsArray[i])){
              MarksSuperValue += oneStudentMarksArray[i] * oneStudentWeightsArray[i];
              weightSum += oneStudentWeightsArray[i]
            }
          }

          //round avg to 2 decimal places
          const average = MarksSuperValue / weightSum;
          let averageRounded = (Math.round(average * 100) / 100).toFixed(2);
          if(isNaN(averageRounded)){
            averageRounded = ""
          }

          return averageRounded;

      },

      //decides if student is threated
      threatness(myAVG) {
          if ((myAVG < 2) && (myAVG != ""))  {
              return "<span class='fire'>ZAGROŻENIE</span>"
          } else {
              return ""
          }
      },

      //returns current Date in an Array
      whatsTheDatePlease() {
          const today = new Date();
          const currentYear = today.getFullYear();
          let currentMonth = today.getMonth();
          let currentDay = today.getDate();
          let currentHours = today.getHours();
          let currentMinutes = today.getMinutes();
          let currentSeconds = today.getSeconds();
          if (currentMonth < 10) {
              currentMonth = `0${currentMonth}`;
          }
          if (currentDay < 10) {
              currentDay = `0${currentDay}`;
          }
          if (currentHours < 10) {
              currentHours = `0${currentHours}`;
          }
          if (currentMinutes < 10) {
              currentMinutes = `0${currentMinutes}`;
          }
          if (currentSeconds < 10) {
              currentSeconds = `0${currentSeconds}`;
          }

          // [DD.MM.YYYY]
          const dateSubArrayDDMMYYYY = [currentDay, currentMonth, currentYear].join(".");

          // [HH:MM:SS]
          const dateSubArrayHHMMSS = [currentHours, currentMinutes, currentSeconds].join(":");

          // [["DD.MM.YYYY"] ["HH:MM:SS"]]
          const dateFull = [];
          dateFull.push(dateSubArrayDDMMYYYY, dateSubArrayHHMMSS)

          // DD.MM.YYYY HH:MM:SS
          const dateFullStr = dateFull.join(" ")

          // [DD.MM.YYYY HH:MM:SS]
          const dateFullArray = [];
          dateFullArray.push(dateFullStr);

          let dateArray;
          return dateArray = dateFullStr;

      }
    }
  }
