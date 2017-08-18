void setup(){
  size(500, 500);

  //println(PI);               // 3.14
  //println(TWO_PI);     // 2*3.14
  //println(HALF_PI);    // 3.14/2
  //println(QUARTER_PI);    // 3.14/4
  //println(radians(90));        //일반각을 호도법으로
  //println(degrees(PI));       // 호도법을 일반각으로
  //println(degrees(radians(90)));   // 결국 90도
  //println(cos(PI));    // -1
  //println(sin(PI));    //  0
  println(cos(radians(45)));
  println(sin(radians(45)));
  println(tan(radians(45)));
  println(tan(radians(60)));
  //println(acos(0.5));   // cos값이 0.5인 각도
  //println(asin(0.5));
  //println(atan(1));     //tan 값이 1인 각도는 45도 -> PI/4
  //println(atan2(mouseY-200,mouseX-200));

  /**
  * atan2(y,x)는 x축에서 좌표 (x,y)의 각을 라디안으로 구함
  * 단 atan2()함수는 y값 먼저 쓴다는 것에 주의!!
  * 즉, 위 함수는 (200,200)점을 원점으로
  * 마우스의 x,y좌표의 각도를 구함
  */

  /**
  * 삼각함수를 이용한 원그리기
  * x= 중심x + (sin(각)*반지름);
  * y= 중심y + (cons(각)*반지름);
  */
  stroke(10);
  int radius = 100;
  for (int deg = 0; deg < 360; deg += 10) {
  float angle = radians(deg);
  float x = 200 + (cos(angle) * radius);
  float y = 200 + (sin(angle) * radius);
  //point(x,y);    // 0~360사이에 10도 간격으로
                    // 중심점이 (200,200)이고
                    // 반지름이 100인 점을 찍어 원을 그림
  ellipse(x, y, 3, 3);   // 10도 간격으로 작은 원을 그려 반지름이 100인 큰원을 표현
}

}
void draw(){

}