const Page = () => {
    return (
        <main className={`flex flex-col gap-35`}>
            <header className={`flex flex-col gap-18 max-w-[720px] mx-auto`}>
                <img src="/fylo-dark/illustration-intro.png" />
                <div className={`flex flex-col items-center gap-6 text-center`}>
                    <h1 className={`text-preset-2 xl:text-preset-1`}>All your files in one secure location, accessible anywhere.</h1>
                    <p className={`text-preset-8`}>
                        Fylo stores all your most important files in one secure location. Access them wherever you need,
                        share and collaborate with friends family, and co-workers.
                    </p>
                    <button className={`text-preset-4 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full w-fit px-20 py-4`}>
                        Get Started</button>
                </div>
            </header>

            <article className={`grid gap-20 xl:grid-cols-2 max-w-[907px] mx-auto`}>
                <section className={`flex flex-col-reverse gap-6 text-center items-center`}>
                    <header className={`flex flex-col gap-2`}>
                        <h2 className={`text-preset-2`}>Access your files, anywhere</h2>
                        <p className={`text-preset-8`}>
                            The ability to use a smartphone, tablet, or computer to access your account means your files
                            follow you everywhere.
                        </p>
                    </header>
                    <img src="/fylo-dark/icon-access-anywhere.svg" className={`h-20 w-20`} />
                </section>
                <section className={`flex flex-col-reverse gap-6 text-center items-center`}>
                    <header className={`flex flex-col gap-2`}>
                        <h2 className={`text-preset-2`}>Access your files, anywhere</h2>
                        <p className={`text-preset-8`}>
                            The ability to use a smartphone, tablet, or computer to access your account means your files
                            follow you everywhere.
                        </p>
                    </header>
                    <img src="/fylo-dark/icon-access-anywhere.svg" className={`h-20 w-20`} />
                </section>
                <section className={`flex flex-col-reverse gap-6 text-center items-center`}>
                    <header className={`flex flex-col gap-2`}>
                        <h2 className={`text-preset-2`}>Access your files, anywhere</h2>
                        <p className={`text-preset-8`}>
                            The ability to use a smartphone, tablet, or computer to access your account means your files
                            follow you everywhere.
                        </p>
                    </header>
                    <img src="/fylo-dark/icon-access-anywhere.svg" className={`h-20 w-20`} />
                </section>
                <section className={`flex flex-col-reverse gap-6 text-center items-center`}>
                    <header className={`flex flex-col gap-2`}>
                        <h2 className={`text-preset-2`}>Access your files, anywhere</h2>
                        <p className={`text-preset-8`}>
                            The ability to use a smartphone, tablet, or computer to access your account means your files
                            follow you everywhere.
                        </p>
                    </header>
                    <img src="/fylo-dark/icon-access-anywhere.svg" className={`h-20 w-20`} />
                </section>
            </article>

            <article className={`flex max-xl:flex-col items-center max-w-[1188px] mx-auto`}>
                <img src="/fylo-dark/illustration-stay-productive.png" />
                <div className={`flex flex-col gap-8`}>
                    <h2 className={`text-preset-2 xl:text-preset-1`}>Stay productive, wherever you are</h2>
                    <div className={`flex flex-col gap-4`}>
                        <p>
                            Never let location be an issue when accessing your files. Fylo has you covered for all of your file storage needs.
                        </p>
                        <p>
                            Securely share files and folders with friends, family and colleagues for live collaboration. No email attachments required.
                        </p>
                        <a>See how Fylo works</a>
                    </div>
                </div>
            </article>
        </main>
    );
};

export default Page;