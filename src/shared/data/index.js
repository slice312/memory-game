import deepFreeze from "deep-freeze";
import DockerLogo from "src/assets/images/docker.png";
import NestLogo from "src/assets/images/nest.svg";
import AngularLogo from "src/assets/images/angular.png";

export const cardsData = deepFreeze([
    {
        type: "Pikachu",
        image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/php-logo_1.png"
    },
    {
        type: "ButterFree",
        image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/css3-logo.png"
    },
    {
        type: "Charmander",
        image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/html5-logo.png"
    },
    {
        type: "Squirtle",
        image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/jquery-logo.png"
    },
    {
        type: "Pidgetto",
        image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/js-logo.png"
    },
    {
        type: "Bulbasaur",
        image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/nodejs-logo.png"
    },
    {
        type: "Docker",
        image: DockerLogo
    },
    {
        type: "Nest",
        image: NestLogo
    },
    {
        type: "Angular",
        image: AngularLogo
    },

]);
