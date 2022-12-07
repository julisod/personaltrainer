export interface NewCustomer {
    firstname: string,
    lastname: string,
    streetaddress: string,
    postcode: string,
    city: string,
    email: string,
    phone: string,
}

interface Link {
    rel: string;
    href: string
}

export interface ExistingCustomer extends NewCustomer {
    id: integer;
    content: any;
    links: Link[];
    content: never[]
}

interface Training {
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