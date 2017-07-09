import {Type} from '@angular/core';

export interface Project {
    id: number;
    name: string;
    info: string;
    image: string;
    repos: string;
    overViewComponent: Type<any>;
    detailComponent: Type<any>;
}

