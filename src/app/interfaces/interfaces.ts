export interface Response {
  status:  boolean;
  message: string;
  data:    InfoUsers[];
}

export interface InfoUsers {
  info_user_id:     number;
  identification:   string;
  password:         string;
  name:             string;
  second_name:      string;
  last_name:        string;
  second_last_name: string;
  phone:            string;
  email:            string;
  address:          string;
  age:              string;
  gender:           Gender;
  typeUser:         TypeUser;
}

export interface InfoUsersList extends Array<InfoUsers>{}

export interface Gender {
  gender_id: number;
  name:      string;
}
export interface GenderList extends Array<Gender>{}


export interface TypeUser {
  type_user_id: number;
  name:         string;
}
export interface TypeUserList extends Array<TypeUser>{}
