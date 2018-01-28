
var personalInfo = {
    name: '박준호',
    height: 171,
};

var plainData = [
    {
        date: 20080604,
        weight: 76.6,
        muscleMass: 29.5,
        fatMass: 23.4,
        percentBodyFat: 30.5
    },
    {
        date: 20091119,
        weight: 70.5,
        muscleMass: 27.5,
        fatMass: 18.6,
        percentBodyFat: 26.4
    },
    {
        date: 20110201,
        weight: 68.6,
        muscleMass: 29.8,
        fatMass: 15.5,
        percentBodyFat: 22.6
    },
    {
        date: 20140226,
        weight: 86.8,
        muscleMass: 31.6,
        fatMass: 30.3,
        percentBodyFat: 34.9
    },
    {
        date: 20141023,
        weight: 86.8,
        muscleMass: 33,
        fatMass: 29.8,
        percentBodyFat: 33.9
    },
    {
        date: 20150112,
        weight: 88,
        muscleMass: 33,
        fatMass: 29.8,
        percentBodyFat: 33.9
    },
    {
        date: 20150126,
        weight: 87.3,
        muscleMass: 33.4,
        fatMass: 29.4,
        percentBodyFat: 32.5
    },
    {
        date: 20150322,
        weight: 86.4,
        muscleMass: 34.4,
        fatMass: 26.0,
        percentBodyFat: 30.1
    },
    {
        date: 20150329,
        weight: 85.9,
        muscleMass: 33.9,
        fatMass: 26.4,
        percentBodyFat: 30.7
    },
    {
        date: 20150407,
        weight: 86,
        muscleMass: 32.9,
        fatMass: 27.9,
        percentBodyFat: 32.4
    },
    {
        date: 20150418,
        weight: 84.4,
        muscleMass: 32.7,
        fatMass: 26.6,
        percentBodyFat: 31.5
    },
    {
        date: 20150424,
        weight: 85,
        muscleMass: 32.2,
        fatMass: 26.4,
        percentBodyFat: 31
    },
    {
        date: 20150501,
        weight: 84.6,
        muscleMass: 32.5,
        fatMass: 27.0,
        percentBodyFat: 31.9
    },
    {
        date: 20150420,
        weight: 89.6,
        muscleMass: 32.7,
        fatMass: 32.1,
        percentBodyFat: 35.8
    },
    {
        date: 20150426,
        weight: 88.4,
        muscleMass: 30,
        fatMass: 34.7,
        percentBodyFat: 39.2
    },
    {
        date: 20160510,
        weight: 88.6,
        muscleMass: 30.7,
        fatMass: 33.8,
        percentBodyFat: 38.2
    },
    {
        date: 20160523,
        weight: 88.4,
        muscleMass: 33.9,
        fatMass: 28.7,
        percentBodyFat: 32.5
    },
    {
        date: 20160608,
        weight: 88.3,
        muscleMass: 34.2,
        fatMass: 27.9,
        percentBodyFat: 31.6
    },
    {
        date: 20160616,
        weight: 85.6,
        muscleMass: 33.3,
        fatMass: 27,
        percentBodyFat: 31.5
    },
    {
        date: 20160622,
        weight: 85,
        muscleMass: 33.5,
        fatMass: 26,
        percentBodyFat: 30.6
    },
    {
        date: 20160708,
        weight: 83.5,
        muscleMass: 32.3,
        fatMass: 26.5,
        percentBodyFat: 31.7
    },
    {
        date: 20170525,
        weight: 89.4
    },
    {
        date: 20170604,
        weight: 88.4,
        muscleMass: 33.1,
        fatMass: 30.1,
        percentBodyFat: 33.1,
        waist: 98,
        hip: 105,
        leftForearm: 34,
        rightForearm: 32,
        leftThigh: 64,
        rightThigh: 63,
    },
    {
        date: 20170610,
        weight: 87.6,
        muscleMass: 33.3,
        fatMass: 29,
        percentBodyFat: 33.1,
        waist: 96,
        hip: 105,
        leftForearm: 33,
        rightForearm: 32,
        leftThigh: 63,
        rightThigh: 62,
    },
];

var data = [
    /*{
        date: 0,
        weight: 0,
        muscleMass: 0,
        fatMass: 0,
        percentBodyFat: 0,
        bmi: (function () { return personalInfo.height && this.weight / (Math.pow(personalInfo.height, 2)) || null; })(),
        bmiResult: (function () { return utils.calcBmiResult(this.bmi) })(),
        waist: 0,
        hip: 0,
        leftForearm: 0,
        rightForearm: 0,
        leftThigh: 0,
        rightThigh: 0,
        allCm: (function () { return (this.waist + this.hip + this.leftForearm + this.rightForearm + this.leftThigh + this.rightThigh) || null; })(),
        allInch: (function () { return utils.getInch(this.allCm) })(),
    },*/
];

plainData.map(function (item) {
    var tempObj = {};

    item['date'] && (tempObj['date'] = item['date']);
    item['weight'] && (tempObj['weight'] = item['weight']);
    item['muscleMass'] && (tempObj['muscleMass'] = item['muscleMass']);
    item['fatMass'] && (tempObj['fatMass'] = item['fatMass']);
    item['percentBodyFat'] && (tempObj['percentBodyFat'] = item['percentBodyFat']);

    // 몸무게로 BMI 구하기
    item['weight'] && (tempObj['bmi'] = (function () { return personalInfo.height && (item['weight'] / Math.pow(personalInfo.height * 0.01, 2)); })());
    // 소수점 둘 째 짜리 이하 버림
    tempObj['bmi'] && (tempObj['bmi'] = utils.floorOff(tempObj['bmi']));
    tempObj['bmi'] && (tempObj['bmiResult'] = (function () { return utils.calcBmiResult(tempObj['bmi']) })());

    item['waist'] && (tempObj['waist'] = item['waist']);
    item['hip'] && (tempObj['hip'] = item['hip']);
    item['leftForearm'] && (tempObj['leftForearm'] = item['leftForearm']);
    item['rightForearm'] && (tempObj['rightForearm'] = item['rightForearm']);
    item['leftThigh'] && (tempObj['leftThigh'] = item['leftThigh']);
    item['rightThigh'] && (tempObj['rightThigh'] = item['rightThigh']);

    item['rightThigh'] && (tempObj['rightThigh'] = item['rightThigh']);
    tempObj['waist'] && (tempObj['allCm'] = (function () { return (tempObj['waist'] + item['hip'] + item['leftForearm'] + item['rightForearm'] + item['leftThigh'] + item['rightThigh']) || null; })());
    tempObj['allCm'] && (tempObj['allInch'] = (function () { return utils.getInch(tempObj['allCm']) })());

    data.push(tempObj);
});

console.log(data);