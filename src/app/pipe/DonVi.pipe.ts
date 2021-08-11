import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'DonVi'
})
export class DonVi implements PipeTransform {

  transform(value: Number){
    let result = '';
    let checkValue = value.toString();
    let LenghtValue = checkValue.length;
    if(value == null || value == undefined ){
      result = '';
    }
    if(LenghtValue <= 3){
      result = checkValue;
    }
    if(LenghtValue > 3 && LenghtValue <= 6){
      result = checkValue.slice(0,LenghtValue-3)+'.'+checkValue.slice(LenghtValue-3,LenghtValue) + ' ₫';
    }
    if(LenghtValue > 6 && LenghtValue <= 9){
      result = checkValue.slice(0,LenghtValue-6)+'.'+checkValue.slice(LenghtValue-6,LenghtValue-3)+'.'+checkValue.slice(LenghtValue-3,LenghtValue) + ' ₫';
    }
    if(LenghtValue > 9 && LenghtValue <= 12){
      result = checkValue.slice(0,LenghtValue-9)+'.'+checkValue.slice(LenghtValue-9,LenghtValue-6)+'.'+checkValue.slice(LenghtValue-6,LenghtValue-3)+'.'+checkValue.slice(LenghtValue-3,LenghtValue) + ' ₫';
    }
    return result;
  }
}

@Pipe({
  name: 'upLow'
})
export class UpLow implements PipeTransform {

  transform(value: string){
    let result = '';
    result = value.toUpperCase();
    return result;
  }

}

@Pipe({
  name: 'upText'
})
export class UpText implements PipeTransform {

  transform(value: string){
    let result = '';
    result = value.charAt(0).toUpperCase() + value.slice(1,value.length);
    return result;
  }

}

@Pipe({
  name: 'subDate'
})
export class SubDate implements PipeTransform {

  transform(value: any){
    let result = '';
    if(value == null || value.toString() == '0000-00-00 00:00:00' ){
      result = '';
    }
    else result = value.toString().slice(5,7) + "/"+value.toString().slice(8,10) +  "/" + value.toString().slice(0,4);
    return result;
  }

}

@Pipe({
  name: 'LoaiKM'
})
export class LoaiKM implements PipeTransform {

  transform(value: string){
    let result = '';
    if(value == 'Tien' ){
      result = '';
    }
    else if(value == '%'){
      result = '%'
    }
    else result = '';
    return result;
  }

}

// @Pipe({
//   name: 'subDate'
// })
// export class SubDate implements PipeTransform {

//   transform(value: Date){
//     let result = '';
//     if(value == null || value.toString() == '0000-00-00 00:00:00' ){
//       result = '';
//     }
//     else result = value.toString().slice(8,10) + "/" +  value.toString().slice(5,7) + "/" + value.toString().slice(0,4);
//     return result;
//   }

// }