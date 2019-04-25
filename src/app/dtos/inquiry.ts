export class InquiryRq {
    question1: number;
    question2: number;
    question3: number;
    observations: string;
    group : string;
}

export class InquiriesByDayRsp {
  day : number;
  week: number;
  num_inquiries : number;
  num_res_q1 : any[];
  num_res_q2 : any[];
  num_res_q3 : any[];
  x100_res_q1 : any[];
  x100_res_q2 : any[];
  x100_res_q3 : any[];
  line : any[];
  comments : any[];
  lastupdatedate : Date;
}

export class InquiriesByWeekRsp {
  week: number;
  day : any[];
  num_inquiries : number;
  num_res_q1 : any[];
  num_res_q2 : any[];
  num_res_q3 : any[];
  x100_res_q1 : any[];
  x100_res_q2 : any[];
  x100_res_q3 : any[];
  line : any[];
  line_q1 : any[];
  line_q2 : any[];
  line_q3 : any[];
  line_aceptabilidad : any[];
  comments : any[];
  lastupdatedate : Date;
}
