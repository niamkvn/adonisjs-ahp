"use strict";
const Ahp = use("App/Models/Ahp");

class AhpController {

  /**
 * purpose: find the next pair to display. 
 * 
 * @param Array optionArray an array of poll options
 * @return Array the row and column of the next unanswered question pair
 * @return Boolean returns false if there are no more pairs
 */
getNextQuestion(optionArray, resultArray){
  console.log(resultArray)
	for(var i = 0; i < optionArray.length; i++){
		for(var j = 0; j < optionArray.length; j++){
			if(resultArray[i][j] === 0){
				return [i, j];
			}
		}
	}
	return false;
};

  displayNextQuestion(kriteria, matrikPerbandingan){
    // get the next pair
    var nextQuestion = this.getNextQuestion(kriteria, matrikPerbandingan);
    let result = []    
    if(nextQuestion !== false){
      // display the pair
      result.push.apply(result, [kriteria[nextQuestion[0]], kriteria[nextQuestion[1]]]);
      console.log(kriteria[nextQuestion[0]]);
      console.log(kriteria[nextQuestion[1]]);
      // bindVoteEvents(nextQuestion);
    } else {
      // calculate the results
      // unbindVoteEvents();
      // calculateResult();
      return "there are no more pairs"
    }
    console.log("compare: ")
    console.log(result)
    return result
  };
  
  tes() {
    // Client Side
    let matrikPerbandingan = []
    let kriteria = ["K1", "K2", "K3", "K4"]
    let arrNilai = [1/3, 1, 1/2]
    // membuat pasangan perbandingan
    for (let i = 0; i < kriteria.length; i++) {
      for (let j = i+1; j < kriteria.length; j++) {
        let row = [kriteria[i], kriteria[j],]
        matrikPerbandingan.push(row);
      }
    }
    // menambahkan nilai perbandigannya
    arrNilai.forEach((element, i) => {
      matrikPerbandingan[i].push(arrNilai[i])
    });
    // End Client Side
    const ahp_kriteriaUtama = new Ahp();
    ahp_kriteriaUtama.tambahKriteria([
      "K1", "K2", "K3", "K4"
    ]);
    ahp_kriteriaUtama.hitungKriteria(matrikPerbandingan);
    const hasil_K = ahp_kriteriaUtama.run();
    return hasil_K
  }
}

module.exports = AhpController;
