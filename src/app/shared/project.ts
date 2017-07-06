import {ReactElement} from 'react';

export interface Project {
    id: number;
    name: string;
    info: string;
    image: string;
    repos: string;
    detailComponent: ReactElement<{}>;
}

