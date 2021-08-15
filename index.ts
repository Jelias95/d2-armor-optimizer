import {
    ClassConversation,
    ExoticConversation,
    FileLocationConversation,
    StatConversation
} from "./src/conversations";
import {
    FindBestArmor,
    ReadArmorFile,
    RemoveClassItems,
    RemoveUnselectedClasses
} from "./src/processors";

const pref = {
    firstStat: "",
    secondStat: "",
    thirdStat: "",
    class: "",
    exotic: ""
};

async function main() {
    pref.class = await ClassConversation(false);
    pref.firstStat = await StatConversation("primary", false);
    pref.secondStat = await StatConversation("secondary", false);
    pref.thirdStat = await StatConversation("third", false);
    pref.exotic = await ExoticConversation(false);
    const inputFilePath = await FileLocationConversation(true);
    let armorList = await ReadArmorFile(inputFilePath);
    armorList = RemoveClassItems(armorList);
    armorList = RemoveUnselectedClasses(armorList, pref.class);
    const selectedArmor = {
        head: FindBestArmor(
            armorList,
            "Helmet",
            pref.firstStat,
            pref.secondStat,
            pref.thirdStat
        ),
        arms: FindBestArmor(
            armorList,
            "Gauntlets",
            pref.firstStat,
            pref.secondStat,
            pref.thirdStat
        ),
        chest: FindBestArmor(
            armorList,
            "Chest Armor",
            pref.firstStat,
            pref.secondStat,
            pref.thirdStat
        ),
        legs: FindBestArmor(
            armorList,
            "Leg Armor",
            pref.firstStat,
            pref.secondStat,
            pref.thirdStat
        )
    };
    console.log(selectedArmor);
}

main();
