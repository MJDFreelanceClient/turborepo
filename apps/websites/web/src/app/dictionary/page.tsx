"use client"

import {useQuery} from "@tanstack/react-query";
import {useStore} from "@tanstack/react-store";
import {wordStore} from "@/app/dictionary/@api/wordStore";
import {getDefinition} from "@/app/dictionary/@api/dictionary";
import {Audio} from "@/app/dictionary/@components/Audio";
import {NoResults, noResults} from "@/app/rest-flags/components/NoResults";

const findAudio = (phonetics:any[]) => {
    const phonetic = phonetics.find((p:any) => !!p.audio)

    return phonetic?.audio;
}


const Page = () => {
    const word = useStore(wordStore);

    const {data, isLoading, isError} = useQuery({
        queryKey: ['dictionary', word],
        queryFn: () => getDefinition(word),

        enabled: !!word,
    })

    if (isLoading) return <div>Loading...</div>;

    if (isError) return <div>Error...</div>;

    if (noResults(data)) return <NoResults data={data} />;

    return (
        <main className={`dark:bg-black dark:text-white`}>
            <>
                {data?.map((definition:any, index:number) => (
                    <div key={index}>
                        <header className={`grid grid-cols-[1fr_auto] items-center`}>
                            <h1 className={`text-preset-1`}>{definition?.word}</h1>
                            {findAudio(definition.phonetics) &&
                                <Audio text={'Play'} url={findAudio(definition.phonetics)}
                                       className={`"px-8 py-2 rounded-full bg-pink-500 hover:bg-blue-600 text-white"`}/>}
                            <div className={`col-span-2 text-preset-2 text-primary`}>{definition?.phonetics?.[0]?.text}</div>
                        </header>
                        <section>
                            {definition.meanings?.map((meaning:any, index:number) => (
                                <div key={index} className={`flex flex-col gap-4`}>
                                    <h2 className={`text-preset-3`}>{meaning?.partOfSpeech}</h2>
                                    <dl className={`flex flex-col gap-2 text-preset-6 font-semibold`}>
                                        {meaning?.definitions?.map((definition:any, index:number) => (
                                            <div key={index} className={`flex gap-[1ch]`}>
                                                <dt>{definition?.definition}</dt>
                                                <dd className={`font-light`}>{definition?.example}</dd>
                                            </div>
                                        ))}
                                    </dl>
                                    {!!meaning.synonyms.length && <div>Synonyms {meaning.synonyms.join(', ')}</div>}
                                </div>
                            ))}
                        </section>
                        <div>Source {definition.sourceUrls.join(', ' +
                            '')}</div>
                    </div>
                ))}
            </>
            {/*<pre>{JSON.stringify(data, null, 2)}</pre>*/}
        </main>
    );
};

export default Page;