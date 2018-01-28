/**
 * Created by ParkJunHo on 10/06/2017.
 */

var utils = {
    getInch: function (value) {
        return utils.floorOff(value * 0.393701) || null
    },
    calcBmiResult: function (bmi) {
        if(!bmi){
            return null
        } else if (bmi < 18.5) {
            return "저체중"
        } else if (bmi >= 18.5 && bmi <= 22.9) {
            return "정상"
        } else if (bmi >= 23 && bmi <= 24.9) {
            return "과체중"
        } else if (bmi >= 25 && bmi < 30) {
            return "중도비만"
        } else {
            return "고도비만"
        }
    },
    /**
     * 소수점 둘 째 짜리 이하 버림
     * @param num - 숫자 타입
     * @returns {number}
     */
    floorOff: function (num) {
        return Math.floor(num * 100) / 100
    },
};

