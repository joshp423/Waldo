import { prisma } from "../lib/prisma.js";
import type { Request, Response, NextFunction } from "express";
import z from "zod"

type TargetParams = {
    gameTitle: string;
}

const usernameSchema = z.object({
    username: z.string(),
    time: z.number()

})

export async function getTargets(req: Request<TargetParams>, res: Response) {
    const gameTitle = req.params.gameTitle;

    //get targets for game 
    const game = await prisma.games.findUnique({
        where: { title: gameTitle },
        include: { targets: true },
    });

    const gameTargets = game?.targets;

    res.json(
        gameTargets || [],
    );
    return;
}

export async function submitScore(req: Request<TargetParams>, res: Response) {
    try {
        const {username, time} = usernameSchema.parse(req.body)
    
        if (!username) {
            return res.status(400).json({message: "Missing Username"});
        }
        const leaderBoardEntry = await prisma.leaderboard.create({
            data: {
                gameid: Number(req.params.gameTitle),
                time: time,
                username: username,
            },
        });
        return res.status(201).json(leaderBoardEntry);
    } catch(error) {
        return res.status(400).json({ error });
    }
}

export async function getLeaderboard(req: Request<TargetParams>, res: Response) {
    const leaderboard = await prisma.leaderboard.findMany({
        orderBy: {
            id: "desc",
        },
    });
    res.json({
        leaderboard
    });
    return;
}
