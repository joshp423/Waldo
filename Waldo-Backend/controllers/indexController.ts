import { prisma } from "../lib/prisma.js";
import type { Request, Response, NextFunction } from "express";

type TargetParams = {
    gameTitle: string;
}

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