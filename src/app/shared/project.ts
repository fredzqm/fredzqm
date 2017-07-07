import {ReactElement} from 'react';
import {Type} from '@angular/core';

export interface Project {
    id: number;
    name: string;
    info: string;
    image: string;
    repos: string;
    detailComponent: Type<any>;
}

