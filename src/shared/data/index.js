import deepFreeze from "deep-freeze";

import NodejsLogo from "src/assets/images/nodejs.png";
import CssLogo from "src/assets/images/css.png";
import HtmlLogo from "src/assets/images/html.png";
import JqueryLogo from "src/assets/images/jquery.png";
import JsLogo from "src/assets/images/js.png";
import MongoDbLogo from "src/assets/images/mongodb.png";
import DockerLogo from "src/assets/images/docker.png";
import NestjsLogo from "src/assets/images/nest.svg";
import AngularLogo from "src/assets/images/angular.png";


export const cardsData = deepFreeze([
    {
        type: "Nodejs",
        image: NodejsLogo
    },
    {
        type: "Css",
        image: CssLogo
    },
    {
        type: "Html",
        image: HtmlLogo
    },
    {
        type: "Jquery",
        image: JqueryLogo
    },
    {
        type: "Js",
        image: JsLogo
    },
    {
        type: "MongoDb",
        image: MongoDbLogo
    },
    {
        type: "Docker",
        image: DockerLogo
    },
    {
        type: "Nestjs",
        image: NestjsLogo
    },
    {
        type: "Angular",
        image: AngularLogo
    }
]);
