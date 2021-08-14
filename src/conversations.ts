import readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

export function ClassConversation(close: boolean): Promise<string> {
    return new Promise((resolve) => {
        rl.question(
            "What class are you? Warlock, Hunter, Titan: ",
            async function (cl: string) {
                if (["Warlock", "Titan", "Hunter"].indexOf(cl) === -1) {
                    console.log("Invalid selection, please try again");
                    resolve(await ClassConversation(close));
                }
                if (close) rl.close();
                resolve(cl);
            }
        );
    });
}

export function StatConversation(
    priority: string,
    close: boolean
): Promise<string> {
    return new Promise((resolve) => {
        rl.question(
            `What ${priority} stat are you targeting? Mob, Res, Rec, Dis, Int, Str: `,
            async function (stat: string) {
                if (
                    ["Mob", "Res", "Rec", "Dis", "Int", "Str"].indexOf(stat) ===
                    -1
                ) {
                    console.log("Invalid selection, please try again");
                    resolve(await StatConversation(priority, close));
                }
                if (close) rl.close();
                resolve(stat);
            }
        );
    });
}

export function ExoticConversation(close: boolean): Promise<string> {
    return new Promise((resolve) => {
        rl.question(
            "What exotic do you want to build around? Leave blank if nothing: ",
            function (exotic: string) {
                if (close) rl.close();
                resolve(exotic);
            }
        );
    });
}

export function FileLocationConversation(close: boolean): Promise<string> {
    return new Promise((resolve) => {
        rl.question(
            "Where is your armor csv located? Full path please: ",
            function (directory: string) {
                if (close) rl.close();
                resolve(directory);
            }
        );
    });
}
