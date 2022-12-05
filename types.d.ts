export interface NewCustomer {
    firstname: string,
    lastname: string,
    streetaddress: string,
    postcode: string,
    city: string,
    email: string,
    phone: string,
}

export interface ExistingCustomer extends NewCustomer {
    id: integer;
    content: any,
    links: any[]
}

export interface Training {
    activity: string;

}

export interface NewTraining {
    date: any;
    duration: string;
    activity: string;
    customer: any;

}

export interface ExistingTraining {
    id: integer;
    date: string;
    duration: number;
    activity: string;

}