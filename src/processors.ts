import fs from "fs";
import csv from "csv-parser";
import {ArmorPiece} from "./interfaces";

export function ReadArmorFile(directory: string): Promise<Array<ArmorPiece>> {
    return new Promise((resolve) => {
        const armorList = new Array<ArmorPiece>();
        fs.createReadStream(directory)
            .pipe(csv())
            .on("data", function (data) {
                Array<Record<string, unknown>>(data).forEach(
                    (armor: Record<string, unknown>) => {
                        armorList.push({
                            name: armor.Name as string,
                            hash: armor.Hash as string,
                            id: armor.Id as string,
                            tier: armor.Tier as string,
                            type: armor.Type as string,
                            class: armor.Equippable as string,
                            mobility: armor["Mobility (Base)"] as number,
                            resilience: armor["Resilience (Base)"] as number,
                            recovery: armor["Recovery (Base)"] as number,
                            discipline: armor["Discipline (Base)"] as number,
                            intellect: armor["Intellect (Base)"] as number,
                            strength: armor["Strength (Base)"] as number,
                            total: armor["Total (Base)"] as number
                        });
                    }
                );
            })
            .on("end", function () {
                resolve(armorList);
            });
    });
}

export function RemoveClassItems(
    armorList: Array<ArmorPiece>
): Array<ArmorPiece> {
    return armorList.filter(
        (armor) =>
            armor.type !== "Titan Mark" &&
            armor.type !== "Warlock Bond" &&
            armor.type !== "Hunter Cloak"
    );
}

export function RemoveUnselectedClasses(
    armorList: Array<ArmorPiece>,
    selectedClass: string
): Array<ArmorPiece> {
    return armorList.filter((armor) => armor.class === selectedClass);
}

export function FindBestArmor(
    armorList: Array<ArmorPiece>,
    armorType: string,
    topStat: string,
    secondStat: string,
    thirdStat: string
): ArmorPiece {
    const statMap = new Map([
        ["Mob", "mobility"],
        ["Res", "resilience"],
        ["Rec", "recovery"],
        ["Dis", "discipline"],
        ["Int", "intellect"],
        ["Str", "strength"]
    ]);

    const first = statMap.get(topStat) as keyof ArmorPiece;
    const second = statMap.get(secondStat) as keyof ArmorPiece;
    const third = statMap.get(thirdStat) as keyof ArmorPiece;

    let bestPiece = armorList[0];
    armorList.forEach((armor: ArmorPiece) => {
        if (
            +armor[first] + +armor[second] + +armor[third] >
                +bestPiece[first] + +bestPiece[second] + +bestPiece[third] &&
            armor.type === armorType
        ) {
            bestPiece = armor;
        }
    });
    return bestPiece;
}
