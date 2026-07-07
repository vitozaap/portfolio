"use client"

import { motion, useReducedMotion } from "motion/react"
import {
    CommandLineIcon,
    Mortarboard01Icon,
    PythonIcon,
    TestTube01Icon,
} from "@hugeicons/core-free-icons"
import { IdeComment, IdeText, IdeTextGroup, IdeTextHighlighted } from "../ideTextComponents"
import { clipReveal, slideUp } from "../anim"
import { ProjectCard, type Project } from "../saturn/projectCard"
import { Highlights, type Highlight } from "../saturn/highlights"

const FFMPYG: Project = {
    name: "FFmpyg",
    tagline: "CLI de compressão de vídeo com FFmpeg",
    status: "concluído",
    stack: ["Python", "FFmpeg", "pytest", "argparse", "Rich", "Questionary"],
    summary:
        "CLI em Python que embrulha o FFmpeg para comprimir vídeos sem decorar flags: presets high/mid/low ajustam o CRF do libx264, com fast mode via argumentos ou wizard interativo com barra de progresso em tempo real.",
    role: "Autor — projeto final do CS50P (Harvard).",
    url: "https://github.com/vitozaap/cs50-python-final-project",
}

const HIGHLIGHTS: Highlight[] = [
    {
        icon: TestTube01Icon,
        title: "Testes unitários",
        description:
            "pytest + pytest-mock: fixtures tmp_path e mocks de subprocess — a suíte cobre parsing, validação e os dois modos sem precisar do FFmpeg instalado.",
    },
    {
        icon: PythonIcon,
        title: "Boas práticas Python",
        description:
            "Camadas separadas: project.py orquestra (argparse, validação de paths e presets) e compressor.py isola os subprocessos de ffmpeg/ffprobe.",
    },
    {
        icon: CommandLineIcon,
        title: "UX de CLI",
        description:
            "Fast mode via flags ou wizard interativo (Questionary) com autocomplete; -progress pipe:1 do ffmpeg alimenta uma barra de progresso Rich ao vivo.",
    },
    {
        icon: Mortarboard01Icon,
        title: "CS50P",
        description:
            "Projeto final do CS50's Introduction to Programming with Python, da Harvard — do design à documentação e testes.",
    },
]

export default function Ffmpyg() {
    const shouldReduce = useReducedMotion()

    return (
        <main className="flex w-full min-h-full flex-col gap-6 tracking-wide">
            <motion.div {...clipReveal(0, shouldReduce)}>
                <IdeComment character="#">
                    ffmpyg — CLI de compressão de vídeo com FFmpeg. veja o preview abaixo.
                </IdeComment>
            </motion.div>

            <section className="flex flex-col gap-4 max-w-full md:max-w-10/12">
                <motion.div {...clipReveal(1, shouldReduce)}>
                    <IdeText>
                        <b>import</b> subprocess {"\n"}
                        <b>from</b>{" "}
                        <IdeTextHighlighted variant="dotted">compressor</IdeTextHighlighted>{" "}
                        <b>import</b> compress, probe_media
                    </IdeText>
                </motion.div>

                <motion.div {...clipReveal(2, shouldReduce)}>
                    <IdeTextGroup groupTitle={<IdeText><b>def</b> main() -&gt; <b>None</b>:</IdeText>}>
                        <IdeText>
                            <IdeComment character="#">uso:</IdeComment> {"\n"}
                            <IdeComment character="#">&nbsp;&nbsp;python project.py -i video.mp4 -p high -o out.mp4</IdeComment> {"\n"}
                            <IdeComment character="#">&nbsp;&nbsp;python project.py → wizard interativo</IdeComment> {"\n"}
                            args = parse_args() {"\n"}
                            validate_args(args)&nbsp;&nbsp;<IdeComment character="#">presets, paths, extensões</IdeComment> {"\n"}
                            compress(args.input, args.preset)&nbsp;&nbsp;<IdeComment character="#">CRF via libx264</IdeComment>
                        </IdeText>
                    </IdeTextGroup>
                </motion.div>
            </section>

            <section className="flex flex-col gap-3">
                <motion.div {...slideUp(3, shouldReduce)}>
                    <IdeComment character="#">preview ↓</IdeComment>
                </motion.div>
                <motion.div {...slideUp(4, shouldReduce)}>
                    <ProjectCard project={FFMPYG} />
                </motion.div>
            </section>

            <section className="flex flex-col gap-3">
                <motion.div {...slideUp(5, shouldReduce)}>
                    <IdeComment character="#">destaques</IdeComment>
                </motion.div>
                <motion.div {...slideUp(6, shouldReduce)}>
                    <Highlights items={HIGHLIGHTS} />
                </motion.div>
            </section>

            <motion.div {...clipReveal(7, shouldReduce)} className="flex flex-col gap-1">
                <IdeComment character="#">notas</IdeComment>
                <IdeComment character="#">- 8 testes unitários cobrindo parsing, validação e os dois modos de execução</IdeComment>
                <IdeComment character="#">- suíte roda sem FFmpeg instalado — subprocessos mockados</IdeComment>
            </motion.div>
        </main>
    )
}
