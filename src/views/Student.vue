<template>
  <div class="editStudentPanel" ref="editStudentPanel">
    <div class="editStudentPanelMain">
      <div class="editStudentPanelNameTitle">
        <span>Imię i Nazwisko ucznia</span>
      </div>

      <div class="editStudentPanelNameValue">
        {{ fullName }}
      </div>

      <div class="editStudentPanelNameDetailData">
        <div class="form-group">
          <span class="title">PESEL:</span>
          <span class="data">{{ pesel }}</span>
        </div>

        <div class="form-group">
          <span class="title">Adres:</span>
          <span class="data"
            >ul.{{ street.name }} {{ street.nr }} m.{{ street.flat }}
            <br />
            {{ street.postCode }} {{ street.city }}</span
          >
        </div>

        <div class="form-group">
          <span class="title">Telefon:</span>
          <span class="data">{{ phone }}</span>
        </div>

        <div class="form-group">
          <span class="title">Email:</span>
          <span class="data">{{ email }}</span>
        </div>

        <div class="form-group">
          <span class="title">Matka:</span>
          <span class="data"
            >{{ mother.firstName }} {{ mother.lastName }} <br />
            {{ mother.phone }} <br />
            {{ mother.email }}
          </span>
        </div>

        <div class="form-group">
          <span class="title">Ojciec:</span>
          <span class="data"
            >{{ father.firstName }} {{ father.lastName }} <br />
            {{ father.phone }} <br />
            {{ father.email }}</span
          >
        </div>
      </div>

      <div class="editStudentPanelNameButtons">
        <button
          name="showEditStudentDataPanel"
          @click="showEditStudentDataPanel()"
        >
          Edytuj Dane
        </button>
      </div>

      <div class="editStudentPanelGradesTitle">
        <span>Oceny</span>
      </div>

      <div
        class="editStudentPanelGradesValue"
        v-html="gradeWeightColor(gradesMarks, gradesWeights)"
      ></div>

      <div class="editStudentPanelGradesButtons">
        <button
          name="showEditStudentGradesPanel"
          @click="showEditStudentGradesPanel()"
        >
          Edytuj / Dodaj ocenę
        </button>
      </div>

      <div class="editStudentPanelAvgTitle">
        <span>Średnia</span>
      </div>

      <div class="editStudentPanelAvgValue">
        {{ avg(marks, weights) }}
      </div>

      <div class="editStudentPanelThreatnessTitle">
        <span>Zagrożenie</span>
      </div>

      <div
        class="editStudentPanelThreatnessValue"
        v-html="threatness(avg(marks, weights))"
      ></div>
    </div>
    <transition-group name="EditStudentDataPanel" mode="out-in">
      <router-view
        v-if="showDataEditionRouterView"
        :showDataEditionRouterView.sync="showDataEditionRouterView"
        key="1"
      ></router-view>
      <router-view
        v-if="showGradesEditionRouterView"
        :showGradesEditionRouterView.sync="showGradesEditionRouterView"
        key="2"
      ></router-view>
    </transition-group>
  </div>
</template>

<script>

import mainMixin from "../assets/mixins/mixins.js";
import gradesService from "../assets/mixins/gradesMixins.js";

import { useRoute } from "vue-router";
import { ref, computed, onMounted, onUpdated } from "vue";
import { useStore } from "vuex";

export default {
  name: "Student",
  setup() {
    const editStudentPanel = ref(null);

    const route = useRoute();

    const store = useStore();

    const showDataEditionRouterView = ref(false);
    const showGradesEditionRouterView = ref(false);

    const fullName = computed(() =>
      store.getters.fullNameGetters(route.params)
    );

    function showEditStudentDataPanel() {
      this.pushMe("EditData");
      this.showDataEditionRouterView = true;
    }

    function showEditStudentGradesPanel() {
      this.pushMe("EditGrades");
      this.showGradesEditionRouterView = true;
    }

    onMounted(() => {
      gradesService().showTooltip(editStudentPanel.value, route.params);
    });

    onUpdated(() => {
      gradesService().showTooltip(editStudentPanel.value, route.params);
    });

    const pesel = route.params.pesel;
    const street = JSON.parse(route.params.street);
    const phone = route.params.phone;
    const email = route.params.email;
    const mother = JSON.parse(route.params.mother);
    const father = JSON.parse(route.params.father);
    const gradesMarks = route.params.marks;
    const gradesWeights = route.params.weights;

    return {

      editStudentPanel,

      pesel,
      street,
      phone,
      email,
      mother,
      father,
      gradesMarks,
      gradesWeights,

      showDataEditionRouterView,
      showGradesEditionRouterView,

      fullName,

      showEditStudentDataPanel,
      showEditStudentGradesPanel,

      ...mainMixin(),
      ...gradesService(),
    };
  },
};
</script>


<style scoped>
.editStudentPanel {
  width: 90%;
  max-width: 1400px;
  margin: 100px auto;
  -webkit-box-shadow: 3px 3px 30px 5px #00c3ff;
  -moz-box-shadow: 3px 3px 30px 5px #00c3ff;
  box-shadow: 3px 3px 30px 5px #00c3ff;
  background-color: rgba(0, 0, 0, 0.55);
  text-align: center;
  position: relative;
  font-size: 13px;
}

.editStudentPanelMain {
  padding: 20px;
  display: grid;
  grid-template-columns: [startName]5fr [startGrades]5fr [startAvg]3fr [startThreatness]3fr;
  grid-template-rows: [startTitle]100px [startStudentData]100px [startStudentDetailData]auto [startStudentDetailDataButton]100px;
  align-items: center;
}

div[class^="editStudentPanelName"] {
  grid-column: startName / startGrades;
}

.editStudentPanelNameTitle {
  grid-row: startTitle / startStudentData;
}

.editStudentPanelNameValue {
  grid-row: startStudentData / startStudentDetailData;
}

.editStudentPanelNameDetailData {
  grid-row: startStudentDetailData / startStudentDetailDataButton;
}

.editStudentPanelNameButtons {
  grid-row: startStudentDetailDataButton;
  margin-left: 10px;
  text-align: center;
}

.editStudentPanelGradesTitle {
  grid-row: startTitle / startStudentData;
}

.editStudentPanelGradesValue {
  grid-row: startStudentData / startStudentDetailData;
  margin: auto;
}

.editStudentPanelGradesButtons {
  grid-row: startStudentDetailDataButton;
}

div[class^="editStudentPanelAvg"] {
  grid-column: startAvg / startThreatness;
}

.editStudentPanelAvgTitle {
  grid-row: startTitle / startStudentData;
}

.editStudentPanelAvgValue {
  grid-row: startStudentData / startStudentDetailData;
}

div[class^="editStudentPanelThreatness"] {
  grid-column: startThreatness;
}

.editStudentPanelThreatnessTitle {
  grid-row: startTitle / startStudentData;
}

.editStudentPanelThreatnessValue {
  grid-row: startStudentData / startStudentDetailData;
}

.editStudentPanelGradesButtons {
  /* background-color: green; */
  grid-column: startGrades / startThreatness;
}

.editStudentPanelNameDetailData {
  margin: 20px 0;
  float: left;
}

.editStudentPanelNameDetailData .form-group {
  display: block;
  margin: auto;
  margin-bottom: 25px;
  padding-left: 45px;
  font-size: 11px;
}

.editStudentPanelNameDetailData .form-group span.title {
  display: inline-block;
  width: 30%;
  font-size: 12.5px;
  text-align: left;
  vertical-align: middle;
}

.editStudentPanelNameDetailData .form-group span.data {
  text-align: left;
  display: inline-block;
  width: 60%;
  margin-left: 5px;
  vertical-align: middle;
}

.editStudentPanelMain button {
  background-color: blueviolet;
  display: inline-block;
  font-size: 13px;
  color: #fff;
  border-radius: 4px;
  padding: 6px 11px;
  text-shadow: 1px 1px 1px violet;
  margin: 0 15px;
}

@media (max-width: 768px) {
  .editStudentPanelMain {
    /* width: 95%; */
    text-shadow: 5px 0px 10px #00c3ff, -5px 0px 10px #00c3ff,
      0px 5px 10px #00c3ff, 0px -5px 10px #00c3ff;
  }
  .editStudentPanelMain {
    font-size: 10px;
  }
  .editStudentPanelMain {
    padding: 3px;
    grid-template-rows: [startTitle]50px [startStudentData]50px [startStudentDetailData]auto [startStudentDetailDataButton]50px;
  }
  .editStudentPanelNameDetailData .form-group span.title {
    font-size: 10px;
  }
  .editStudentPanelNameDetailData .form-group {
    padding-left: 3px;
    font-size: 9px;
  }
  .editStudentPanelMain button {
    font-size: 9px;
    padding: 5px;
  }
}
</style>
