import { NewGrades } from "@/store/state";
import { computed } from "vue";
import { useStore } from "vuex";

export default function gradesMixins(){
  
    const store = useStore();
    
    const students = computed(() => store.state.students);
    const marks = computed(() => store.state.newGrades.marks);
    const weights = computed(() => store.state.newGrades.weights);
    const descriptions = computed(() => store.state.newGrades.descriptions);
    const dates = computed(() => store.state.newGrades.dates);


    //colors grades
    function gradeWeightColor(oneStudentMarks: number[], oneStudentsWeights: number[]): string {
      
      //adds new classes to divs with grades, what causes coloring them on green, yellow or red
      let content = "";

      for (let i = 0; i < oneStudentMarks.length; i++) {
        if (!isNaN(oneStudentMarks[i])) {
          if (oneStudentsWeights[i] === 1) {
            content += `<div class="gradeWeightColor gradeWeightGreen">${oneStudentMarks[i]}</div>`
          } else if (oneStudentsWeights[i] === 2) {
            content += `<div class="gradeWeightColor gradeWeightYellow">${oneStudentMarks[i]}</div>`
          } else if (oneStudentsWeights[i] === 3) {
            content += `<div class="gradeWeightColor gradeWeightRed">${oneStudentMarks[i]}</div>`
          }
          else if (isNaN(oneStudentsWeights[i])) {
            content += `<div class="gradeWeightColor">${oneStudentMarks[i]}</div>`
          }
        }
        else if (!isNaN(oneStudentMarks[i])) {
          if (oneStudentsWeights[i] === 1) {
            content += `<div class="gradeWeightColor gradeWeightGreen" style="width: 30px; height: 36px;"> </div>`
          }
          else if (oneStudentsWeights[i] === 2) {
            content += `<div class="gradeWeightColor gradeWeightYellow" style="width: 30px; height: 36px"> </div>`
          }
          else if (oneStudentsWeights[i] === 3) {
            content += `<div class="gradeWeightColor gradeWeightRed" style="width: 30px; height: 36px;"> </div>`
          }
        }
      }

      return content

    }


    //show tooltip after hovering on every grade
    function showTooltip(this: any, RootElement: HTMLDivElement, SingleStudent: NewGrades): void {
      
      const gradesInDiv: NodeListOf<Element> = RootElement.querySelectorAll(".gradeWeightColor");

      const SingleStudentMarks = SingleStudent.marks
      const SingleStudentWeights = SingleStudent.weights
      const SingleStudentDescriptions = SingleStudent.descriptions
      const SingleStudentDates: Date[] = SingleStudent.dates

      console.log(SingleStudent)
      for (let i = 0; i < SingleStudentMarks.length; i++) {
        
        if (SingleStudentDescriptions[i] === "") {
          SingleStudentDescriptions[i] = "BRAK OPISU"
        }

        // for(const gradeProperty in store.state.newGrades){
        //   SingleStudent[gradeProperty].map( (el: string | number)=>{ 
        //     SingleStudent.marks[el] !== "" && SingleStudent.weights[el] !== "" 
        //   })
        // }
        // SingleStudent.marks.map(el=>{})
        
      }
      

      for (let i = 0; i < gradesInDiv.length; i++) {

        if ((SingleStudentMarks[i] !== undefined) || (SingleStudentWeights[i] !== undefined)) {

          //draws tooltip after hovering
          gradesInDiv[i].addEventListener("mouseenter", function () {
            canvas(SingleStudentMarks[i], SingleStudentWeights[i], SingleStudentDescriptions[i], SingleStudentDates[i], gradesInDiv[i])
          }.bind(this), false);


          //destroyes tooltip after leaving
          gradesInDiv[i].addEventListener("mouseleave", function () {
            const canv = RootElement.querySelector("canvas") as HTMLCanvasElement;
            canv.parentNode!.removeChild(canv);
          });
        }

      }
    }

    //draws tooltip
    function canvas(SingleGrade: number, SingleWeight: number, SingleDescription: string, SingleDate: Date, anotherDivWithGrade: any): void {

      const canvas = document.createElement("CANVAS") as HTMLCanvasElement;
      anotherDivWithGrade.appendChild(canvas);

      const canv = document.querySelector("canvas") as HTMLCanvasElement;
      const ctx = canv.getContext("2d")!;

      canvas.style.zIndex = `${2}`;
      canvas.style.position = 'absolute';
      canvas.style.padding = `${0}`;
      canvas.style.border = `${0}`;

      ctx.beginPath();
      ctx.moveTo(0, 10);
      ctx.lineTo(25, 15);
      ctx.lineTo(220, 15);
      ctx.lineTo(220, 115);
      ctx.lineTo(25, 115);
      ctx.lineTo(25, 40);
      ctx.lineTo(0, 10);
      ctx.stroke();
      ctx.fillStyle = "#ffeab0";
      ctx.fill();
      ctx.fillStyle = "black";
      ctx.font = "700 12px Arial";

      ctx.fillText(`Ocena: ${SingleGrade}`, 40, 40);
      ctx.fillText(`Waga: ${SingleWeight} `, 40, 60);

      if (SingleDescription == "BRAK OPISU") {
        ctx.fillText(`Opis:`, 40, 80);
        ctx.font = "italic 700 12px Arial";
        ctx.fillText(`${SingleDescription}`, 77, 80);
        ctx.font = "700 12px Arial";
      }
      else {
        ctx.fillText(`Opis: ${SingleDescription} `, 40, 80);
      }

      ctx.fillText(`Data: ${SingleDate}`, 40, 100);

    }

    //returns grades' average
    function avg(oneStudentMarksArray: number[], oneStudentWeightsArray: number[]): string | number {

      let MarksSuperValue = 0;
      let weightSum = 0;

      for (let i = 0; i < oneStudentMarksArray.length; i++) {
        if ((!isNaN(oneStudentMarksArray[i])) && (!isNaN(oneStudentWeightsArray[i]))) {
          MarksSuperValue += oneStudentMarksArray[i] * oneStudentWeightsArray[i];
          weightSum += oneStudentWeightsArray[i]
        }
      }

      //round avg to 2 decimal places
      const average: number = MarksSuperValue / weightSum;
      let averageRounded: number  = +(Math.round(average * 100) / 100).toFixed(2) as number;
      if (isNaN(averageRounded)) {
        return ""
      }

      return averageRounded;

    }

    //decides if student is threated
    function threatness(myAVG: number) {
      if ((myAVG < 2) && (isNaN(myAVG))) {
        return "<span class='fire'>ZAGROŻENIE</span>"
      } else {
        return ""
      }
    }

    //returns current Date in an Array
    function whatsTheDatePlease(): string {
      const today = new Date();
      const currentYear = today.getFullYear();
      let currentMonth: number | string = today.getMonth() + 1;
      let currentDay: number | string = today.getDate();
      let currentHours: number | string = today.getHours();
      let currentMinutes: number | string = today.getMinutes();
      let currentSeconds: number | string = today.getSeconds();
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

      return dateFullStr;

    }
   
    return {
      students,
      marks,
      weights,
      descriptions,
      dates,
      gradeWeightColor,
      showTooltip,
      canvas,
      avg,
      threatness,
      whatsTheDatePlease           
    }
  
}