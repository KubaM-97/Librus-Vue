
export default {
  methods:
  {
      //colors grades
      gradeWeightColor(oneStudentGrades, oneStudentsWeights) {

          //adds new classes to divs with grades, what causes coloring them on green, yellow or red
          let content = "";
          for (let i = 0; i < oneStudentGrades.length; i++) {
              if (oneStudentsWeights[i] == 1) {
                  content += `<div class="gradeWeightColor gradeWeightGreen">${oneStudentGrades[i]}</div>`
              } else if (oneStudentsWeights[i] == 2) {
                  content += `<div class="gradeWeightColor gradeWeightYellow">${oneStudentGrades[i]}</div>`
              } else if (oneStudentsWeights[i] == 3) {
                  content += `<div class="gradeWeightColor gradeWeightRed">${oneStudentGrades[i]}</div>`
              }
          }

          return content

      },

      //show tooltip after hovering on every grade
      showTooltip(RootElement, SingleStudent, StudentsLength = "1") {
        // alert(44)

          const gradesInDiv = RootElement.querySelectorAll(".gradeWeightColor");

          const gradesSuperArray = [];
          const weightSuperArray = [];
          const descriptionSuperArray = [];
          const dateSuperArray = [];

          if(StudentsLength.length == 1){ 
            for (let j = 0; j < SingleStudent.grades.length; j++) {
               gradesSuperArray.push(SingleStudent.grades[j]);
               weightSuperArray.push(SingleStudent.weights[j]);
               descriptionSuperArray.push(SingleStudent.descriptions[j]);
               dateSuperArray.push(SingleStudent.dates[j]);
           }
           // console.log("To jest tablica: "+gradesSuperArray)
           // console.log(gradesInDiv.length)
          }
          else{
              for (let i = 0; i < StudentsLength.length; i++) {

                  for (let j = 0; j < SingleStudent[i].grades.length; j++) {
                      gradesSuperArray.push(SingleStudent[i].grades[j]);
                      weightSuperArray.push(SingleStudent[i].weights[j]);
                      descriptionSuperArray.push(SingleStudent[i].descriptions[j]);
                      dateSuperArray.push(SingleStudent[i].dates[j]);
                  }
              }
          }

          for (let i = 0; i < gradesInDiv.length; i++) {

              //draws tooltip after hovering
              gradesInDiv[i].addEventListener("mouseenter", function() {
                  this.canvas(gradesSuperArray, weightSuperArray, descriptionSuperArray, dateSuperArray, gradesInDiv[i], i)
              }.bind(this), false);


              //destroyes tooltip after leaving
              gradesInDiv[i].addEventListener("mouseleave", function() {
                  const canv = document.querySelector("canvas");
                  canv.parentNode.removeChild(canv);
              });

          }
      },

      //draws tooltip
      canvas(arrayWithAllGrades, arrayWithAllWeights, arrayWithAllDescriptions, arrayWithAllDates, anotherGradeWeightColorDiv, i) {

          const canvas = document.createElement("CANVAS");
          anotherGradeWeightColorDiv.appendChild(canvas);

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
          ctx.font = "bold 15px Arial";

          ctx.fillText(`Ocena: ${arrayWithAllGrades[i]}`, 40, 50);
          ctx.fillText(`Waga: ${arrayWithAllWeights[i] } `, 40, 70);
          ctx.fillText(`Opis: ${arrayWithAllDescriptions[i]}`, 40, 90);
          ctx.fillText(`Data: ${arrayWithAllDates[i]}`, 40, 110);

      },

      //returns grades' average
      avg(oneStudentGradesArray, oneStudentsWeightsArray) {

          let gradesSuperValue = 0;
          let weightSum = 0;


          for (let i = 0; i < oneStudentGradesArray.length; i++) {
              gradesSuperValue += oneStudentGradesArray[i] * oneStudentsWeightsArray[i];
              weightSum += oneStudentsWeightsArray[i]
          }

          //round avg to 2 decimal places
          const average = gradesSuperValue / weightSum;
          let averageRounded = (Math.round(average * 100) / 100).toFixed(2);
          if(isNaN(averageRounded)){
            averageRounded = ""
          }

          return averageRounded;

      },

      //decides if student is threated
      threatness(myAVG) {
          if (myAVG < 2) {
              return "<span class='fire'>ZAGROŻENIE</span>"
          } else {
              return ""
          }
      }

    }
  }





  // //show tooltip after hovering on every grade
  // showTooltip: function(RootElement, Students = "1") {
  //     const gradesInDiv = RootElement.querySelectorAll(".gradeWeightColor");
  //     const gradesSuperArray = [];
  //     const weightSuperArray = [];
  //     const descriptionSuperArray = [];
  //     const dateSuperArray = [];
  //
  //
  //     for (let i = 0; i < Students.length; i++) {
  //         for (let j = 0; j < Students[i].grades.length; j++) {
  //             gradesSuperArray.push(Students[i].grades[j]);
  //             weightSuperArray.push(Students[i].weights[j]);
  //             descriptionSuperArray.push(Students[i].descriptions[j]);
  //             dateSuperArray.push(Students[i].dates[j]);
  //         }
  //     }
  //     for (let j = 0; j < gradesInDiv.length; j++) {
  //         gradesSuperArray.push(this.$route.params.grades[j]);
  //         weightSuperArray.push(this.$route.params.weights[j]);
  //         descriptionSuperArray.push(this.$route.params.descriptions[j]);
  //         dateSuperArray.push(this.$route.params.dates[j]);
  //     }
  //
  //     for (let i = 0; i < gradesInDiv.length; i++) {
  //
  //         //draws tooltip after hovering
  //         gradesInDiv[i].addEventListener("mouseenter", function() {
  //             this.canvas(gradesSuperArray, weightSuperArray, descriptionSuperArray, dateSuperArray, gradesInDiv[i], i)
  //         }.bind(this), false);
  //
  //
  //         //destroyes tooltip after leaving
  //         gradesInDiv[i].addEventListener("mouseleave", function() {
  //             const canv = document.querySelector("canvas");
  //             canv.parentNode.removeChild(canv);
  //         });
  //
  //     }
  // },
