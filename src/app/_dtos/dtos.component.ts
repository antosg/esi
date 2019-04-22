export class LoginRq {
    email: string;
    password: string;
}

export class ResetRq {
    password: string;
    confirm: string;
}

export class UserLoginDto {
    email: string;
    name: string;
    surname: string;
    uid: string;
}

export class LoginRs {
    token: string;
    expires: string;
    user: UserLoginDto;
}


export class RegisterRq {
    email: string;
    password: string;
    name: string;
    surname: string;
    country: string;
    language: string;
    passwordRepeat: string;
    terms: boolean;
}

export class RegisterGroupRq {
    group: string;
    invitations: emailsGroupDto[];
}

export class emailsGroupDto {
    email: string;
}

export class RegisterGroupRs {
    group: string;
    admin: string;
    creationDate: string;
    lupdateDate: string;
    createdBy : string;
    lupdateBy: string;
    fecini : string;
    fecfin : string;
    members_number: string;
    members: memberGroupDto[];
}

export class memberGroupDto {
    email: string;
    fecini: string;
    fecfin: string;
    creationDate: string;
    lupdateDate : string;
    createdBy : string;
    lupdateBy: string;
    last_inquiry: string;
    inquiry_number: string;
}

export class suggestionRq {
    suggestion: string;
}

export class RegisterRs {
    email: string;
    password: string;
    name: string;
    surname: string;
    country: string;
    language: string;
    creationDate: string;
    lupdateDate: string;
    createdBy: string;
    lupdateBy: string;
    lastLogin: string;
    swiact: string;
    generalReputationAvg: string;
    totalReputations: string;
    totalCallPending: string;
    role: string[];
    uid: string;
    _id: string;
}

export class modifyUserRq {
  name: string;
  surname: string;
  country: string;
  language: string;
}

export class userPreferencesRq {
  avatar: string;
  language: string;
  swipush: string;
  token: string;
}

export class userPreferencesRsp {
  language: string;
  preferences : any;
}

export class TransactionRq {
    userStartTransaction: String //	who start the transaction (who valorate)
    userEndTransaction: String	//who end the transaction (who accept)
    transactionDescription: String //transaction description
}

export class TransactionRs {
    userStartTransaction: String	//user who start the transaction (who valorate)
    userEndTransaction:	String	 //user who end the transaction (who accept)
    transactionDescription:	String	 //transaction description
    creationDate:	Date	 //creation date
    lupdateDate:	Date	//last update date
    createdBy:	String	//User who created the transaction
    lupdateBy:	String	//Last user who modified the transaction
    swiAccept:	String	//is accept the transaction?
    transactionValoration:	String	//value of the valoration
    transactionValDescription:	String	//description of the valoration
    _id: String	//Unique identifier for the transaction
}

export class TransactionAcceptRs {
    ok:	number	//1 for ok 0 for ko
    nModified: number	//number of modified records
    n: number	//number
}

export class TransactionValorateRs {
    ok:	number	//1 for ok 0 for ko
    nModified: number	//number of modified records
    n: number	//number
}

export class TransactionGetAllRs {
    transactions : Array<TransactionRs>
}
