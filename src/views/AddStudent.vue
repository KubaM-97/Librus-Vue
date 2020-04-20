<template>
    <div class="addStudentPanel">

        <div class="addStudentPanelMain">

            <div class="addStudentPanelName">

                <label for="name">*Imię i Nazwisko:

                    <span class="nameTooltip">
                        Podwójne nazwiska przy pomocy myślnika
                    </span>

                </label>

                <input type="text" v-model="add.name" id="name" maxlength="30">

                <span class="required"></span>

            </div>

            <div class="addStudentPanelGrades">

                <div class="addStudentPanelGradesTitle">

                    <span class="addStudentGradeSubpanelTitle">Dotychczasowe oceny:</span>

                </div>

                <div class="addStudentPanelGradesContent">

                    <div class="addStudentPanelGradesContentSingle">

                        <div class="addStudentPanelGradesContentSingleGrade">

                            <label for="grades">Ocena:</label>

                            <select v-model.number="add.grades" id="grades">
                                <option value=""></option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                            </select>

                        </div>

                        <div class="addStudentPanelGradesContentSingleWeight">

                            <label for="weight">Waga oceny:</label>

                            <select v-model.number="add.weight" id="weight">
                                <option value=""></option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>

                        </div>

                        <div class="addStudentPanelGradesContentSingleDescription">

                            <span class="descriptionCount">Pozostało: 30 znaków.</span>

                            <label>Opis oceny:

                                <input type="text" v-model.number="add.description" class="description" maxlength="30">

                            </label>

                        </div>

                    </div>

                </div>

                <!-- <div class="addStudentPanelGradesContentButton"> -->

                    <button class="addNewGradeButton" @click="addNewGrade()">
                        +
                    </button>

                <!-- </div> -->

               <div class="addStudentPanelSummary">

                    <table class="summary">

                            <tr>
                                <td><span v-if="add.name!==''">{{add.name | formatName}}</span></td>

                                <td>

                                    <span v-if="add.grades!=='' && add.weight===''">
                                        <div class="gradeWeightColor">
                                            {{add.grades}}
                                        </div>
                                    </span>

                                    <span v-else-if="add.grades!=='' && add.weight===1">
                                        <div class="gradeWeightColor gradeWeightGreen"> {{add.grades}}
                                        </div>
                                    </span>

                                    <span v-else-if="add.grades!=='' && add.weight===2">
                                        <div class="gradeWeightColor gradeWeightYellow"> {{add.grades}}
                                        </div>
                                    </span>

                                    <span v-else-if="add.grades!=='' && add.weight===3">
                                        <div class="gradeWeightColor gradeWeightRed"> {{add.grades}}
                                        </div>
                                    </span>

                                </td>

                                <td>
                                    <!-- <span v-if="add.grades!=='' && add.weight!==''" v-model="add.avg">{{addAvg}} -->
                                    <!-- </span> -->
                                </td>

                                <td>
                                    <span v-if="add.avg!==''" class="fire">
                                        {{addThreatness}}
                                    </span>
                                </td>
                            </tr>

                        </table>

                </div>

                <div class="addStudentPanelButtons">

                        <button class="btn btn-danger btn-lg" @click="addStudentCancel()">Anuluj</button>

                        <button class="btn btn-primary btn-lg" @click="addStudent()">Dodaj ucznia</button>

                </div>


            </div>

        </div>

    </div>

</template>

<script>
import Vue from 'vue'
export default {
    // el:".addStudentPanel",
    name: "currentViewAdd",
    // components:{AddStudent},
     data(){
       return{
            add: {
                    name: "",
                    grades: "",
                    weight: "",
                    avg: "",
                    description: "",
                    date: "",
                },
       }
   },
}
</script>

<style scoped>


.addStudentPanel {
    width: 90%;
    max-width: 1500px;
    margin: 100px auto;
    -webkit-box-shadow: 3px 3px 30px 5px #00c3ff;
    -moz-box-shadow: 3px 3px 30px 5px #00c3ff;
    box-shadow: 3px 3px 30px 5px #00c3ff;
    filter: blur(0.44px);
    background-color: rgba(0, 0, 0, .55);
    text-align: center;
    font-size: 18px;
}

.addStudentPanelMain {
    padding: 40px;
    display: grid;

    grid-template-columns: [startName]6fr [endName-startFreeSpace]1fr [endFreeSpace-startGrade]1fr [startTitle]1fr [endGrade-startWeight]2fr [endWeight-startDescription]3fr [endTitle]2fr [endDescription-startPlus]2fr [endPlus];

    grid-template-rows: [startTitle] [endFreeSpace-startSummary]1fr [endButtons];
    grid-row-gap: 30px;
}

.addStudentPanelMain .addStudentPanelName {
    grid-column: startName / endName-startFreeSpace;
    margin-top: 90px;
}

.addStudentPanel label span.nameTooltip {
    font-size: 14px;
    display: block;
}


.addStudentPanelMain .addStudentPanelGrades {
    grid-column: endFreeSpace-startGrade / endPlus;
}

.addStudentPanelMain .addStudentPanelGradesTitle {
    grid-column: startTitle / endTitle;
    grid-row: startTitle / endTitle-startLabels;
}

.addStudentPanelMain div[class^="addStudentPanelGradesContent"] {
    margin: 30px 0;
    display: inline-block;
}

.addStudentPanelMain .addStudentPanelGradesContentSingleGrade {
    grid-column: endFreeSpace-startGrade / endGrade-startWeight;
}

.addStudentPanelMain .addStudentPanelGradesContentSingleWeight {
    grid-column: endGrade-startWeight / endWeight-startDescription
}

.addStudentPanelMain .addStudentPanelGradesContentSingleDescription {
    grid-column: endWeight-startDescription / endDescription-startPlus;
}

.addStudentPanelMain .addStudentPanelGradesContentSingleDescription span.descriptionCount {
    font-size: 14px;
}


.addStudentPanelMain .addStudentPanelGradesContentButton {
    grid-column: endDescription-startPlus;
    grid-row: endTitle-startLabels / endLabels-startFreeSpace;
    position: absolute;
    right: 90px;
    top: 10px;
}

.addStudentPanel .addStudentPanelGradesContentButton button {
    border-radius: 50%;
    width: 40px;
    height: 25px;
    text-shadow: none;
    color: black;
    font-size: 20px;
    padding-bottom: 32px;
    background-color: #a5a6a8;
    border: 7px solid #797c80;
}

.addStudentPanel .addNewGradeButton:hover {
    background-color: #797c80;
    border: 7px solid #a5a6a8;
}




.addStudentPanelMain .addStudentPanelSummary {
    grid-column: startName / endDescription-startPlus;
    grid-row: endFreeSpace-startSummary;
}

.addStudentPanelMain .addStudentPanelButtons {
    grid-column: endWeight-startDescription / endDescription-startPlus;
}

.addStudentPanel label {
    display: block;
}

.addStudentPanel input {
    outline: none;
    display: block;
    margin: auto;
    margin-top: 10px;
    width: 300px;
    height: 30px;
    font-size: 0.52rem;
    text-align: center;
    background-color: #efefef;
    border-radius: 5px;
    border: 2px solid #ddd;
    box-sizing: border-box;
    caret-color: #00c3ff;
}

.addStudentPanel input:focus {
    border: 2px solid #a5cda5;
    background-color: #00c3ff;
    color: black;
    -webkit-box-shadow: 0px 0px 10px 2px rgba(204, 204, 204, 0.9);
    -moz-box-shadow: 0px 0px 10px 2px rgba(204, 204, 204, 0.9);
    box-shadow: 0px 0px 10px 2px rgba(204, 204, 204, 0.9)
}

.addStudentPanel select {
    color: #00c3ff;
    font-size: 18px;
    border-radius: 4px;
    margin-top: 5px;
}

.addStudentPanel select option {
    color: #00c3ff;
    text-align: center;
}

.addStudentPanelMain .addStudentPanelSummary table.summary {
    width: 100%;
    margin-left: 30px
}

.addStudentPanelMain .addStudentPanelSummary table.summary td {
    height: 60px;
    padding: 15px 50px;
    border: 1px solid white;
    text-align: center;
}

.addStudentPanelMain .addStudentPanelSummary table.summary td:nth-child(1),
.addStudentPanelMain .addStudentPanelSummary table.summary td:nth-child(4) {
    width: 250px;
}

.addStudentPanelMain .addStudentPanelSummary table.summary td:nth-child(2),
.addStudentPanelMain .addStudentPanelSummary table.summary td:nth-child(3) {
    width: 100px;
}






</style>
