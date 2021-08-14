import fs from "fs";
import csv from "csv-parser";
import {ArmorPiece} from "./interfaces";

export function ReadArmorFile(directory: string): Promise<Array<ArmorPiece>> {
    return new Promise((resolve) => {
        const armorList = new Array<ArmorPiece>();
        fs.createReadStream(directory)
            .pipe(csv())
            .on("data", function (data) {
                Array<Record<string, string>>(data).forEach(
                    (armor: Record<string, string>) => {
                        armorList.push({
                            name: armor.Name,
                            hash: armor.Hash,
                            id: armor.Id,
                            tier: armor.Tier,
                            type: armor.Type,
                            class: armor.Equippable,
                            mobility: armor["Mobility (Base)"],
                            resilience: armor["Resilience (Base)"],
                            recovery: armor["Recovery (Base)"],
                            discipline: armor["Discipline (Base)"],
                            intellect: armor["Intellect (Base)"],
                            strength: armor["Strength (Base)"],
                            total: armor["Total (Base)"]
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

export function RemoveUnselectedClass(
    armorList: Array<ArmorPiece>,
    selectedClass: string
): Array<ArmorPiece> {
    return armorList.filter((armor) => armor.class === selectedClass);
}
