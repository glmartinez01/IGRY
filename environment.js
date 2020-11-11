import Constants from "expo-constants";
import { func } from "prop-types";

const ENV = {
    dev: {

        apiKey: "09202mxdctwxx7nnzpd1jt9p1mgxfq",
        apiAuthorization: "Bearer frefjyp97udjwq50ubue49vp9ofguu",
        apiUrl: "https://api.igdb.com/v4/",
        apiImageUrl:"https://images.igdb.com/igdb/image/upload/",
        apiImageSize:"t_cover_big/",
        apiSSSize:"t_1080p/"
       
    }
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
    if (__DEV__){
        return ENV.dev;
    }
};

export default getEnvVars;


//apiKey: "7655d7b2b756449194db39f34db7841c" /*currency*/
//apiUrl: "https://api.spoonacular.com/recipes/complexSearch", recetas
//apiKey: "7e47eb5c42fd4703a6cfbebd75f1631c"
//apiKey: "9c97a9637466f09bf0cba21718d67ea9", marvel
//privKey: "f206117ff9da6c64531ab419f3501dc9d940a694"