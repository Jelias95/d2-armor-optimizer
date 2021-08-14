import {
    ClassConversation,
    ExoticConversation,
    FileLocationConversation,
    StatConversation
} from "./src/conversations";
import {
    ReadArmorFile,
    RemoveClassItems,
    RemoveUnselectedClass
} from "./src/processors";

const pref = {
    firstStat: "",
    secondStat: "",
    class: "",
    exotic: ""
};

async function main() {
    pref.class = await ClassConversation(false);
    pref.firstStat = await StatConversation("primary", false);
    pref.secondStat = await StatConversation("secondary", false);
    pref.exotic = await ExoticConversation(false);
    const inputFilePath = await FileLocationConversation(true);
    let armorList = await ReadArmorFile(inputFilePath);
    armorList = RemoveClassItems(armorList);
    armorList = RemoveUnselectedClass(armorList, pref.class);
    console.log(armorList);
}

main();
