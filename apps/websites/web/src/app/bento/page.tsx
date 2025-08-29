const Page = () => {
    return (
        <main className={`grid gap-8 text-black max-w-[1120px] mx-auto 
                grid-areas-[one|two|three|four|five|six|seven|eight]
                md:grid-areas-[one_one|two_three|four_four|five_five|six_six|seven_eight]
                xl:grid-areas-[seven_one_one_four|seven_two_three_four|eight_two_three_four|eight_six_five_five]`}>
            <article className={`grid-area-[one] bg-purple-500 text-white flex flex-col gap-6 items-center text-center py-10 px-8 rounded-[10px]`}>
                <h2 className={`text-preset-1 max-w-[10ch]`}>Social Media 10x Faster with AI</h2>
                <div className={`flex flex-col gap-2 items-center`}>
                    <img src="/bento/images/illustration-five-stars.webp" className={`h-8`} />
                    <p className={`text-preset-5`} >
                        Over 4,000 5-star reviews
                    </p>
                </div>
            </article>

            <article className={`grid-area-[two] flex flex-col-reverse p-4 bg-white gap-4 rounded-[10px]`}>
                <h2 className={`text-preset-3 w-[10ch]`}>
                    Manage multiple accounts and platforms.
                </h2>
                <img src="/bento/images/illustration-multiple-platforms.webp" className={`w-full`} />
            </article>

            <article className={`grid-area-[three] flex flex-col p-4 pb-0 bg-yellow-500 gap-4 rounded-[10px] overflow-hidden`}>
                <h2 className={`text-preset-3 max-w-[15ch]`}>
                    Maintain a consistent posting schedule.
                </h2>
                <img src="/bento/images/illustration-consistent-schedule.webp" className={`w-[208px] -mb-5 xl:-mb-40`} />
            </article>

            <article className={`grid-area-[four] flex flex-col p-4 py-8 bg-purple-100 rounded-[10px] overflow-hidden gap-6 items-center`}>
                <h2 className={`text-preset-3`}>
                    Schedule to social media.
                </h2>
                <img src="/bento/images/illustration-schedule-posts.webp" className={`xl:h-[320px] xl:min-w-[350px] xl:-mr-[150px]`} />
                <p className={`max-w-[26ch] text-center text-preset-5`}>
                    Optimize post timings to publish content at the perfect time for your audience.
                </p>
            </article>

            <article className={`grid-area-[five] flex flex-col-reverse md:flex-row-reverse p-6 bg-purple-500 text-white rounded-[10px] overflow-hidden gap-6 items-center`}>
                <h2 className={`text-preset-3 max-w-[12ch] text-center`}>
                    Grow followers with non-stop content.
                </h2>
                <img src="/bento/images/illustration-grow-followers.webp" className={`max-w-[227px]`} />
            </article>

            <article className={`grid-area-[six] flex flex-col p-6 bg-white rounded-[10px] overflow-hidden gap-6`}>
                <header className={`flex flex-col gap-4`}>
                    <h2 className={`text-preset-1 max-w-[12ch]`}> &gt;56% </h2>
                    <p className={`text-preset-5`}>faster audience growth</p>
                </header>
                <img src="/bento/images/illustration-audience-growth.webp" className={`max-w-[227px]`} />
            </article>

            <article className={`grid-area-[seven] flex flex-col p-8 bg-yellow-100 rounded-[10px] overflow-hidden gap-6 xl:py-20`}>
                <h2 className={`text-preset-2`}> Create and schedule content <span className={`text-purple-500`}>quicker</span>.</h2>
                <img src="/bento/images/illustration-create-post.webp" className={`max-w-[227px]`} />
            </article>

            <article className={`grid-area-[eight] flex flex-col p-8 bg-yellow-500 rounded-[10px] overflow-hidden gap-6`}>
                <h2 className={`text-preset-2`}> Write your content using AI..</h2>
                <img src="/bento/images/illustration-ai-content.webp"  />
            </article>
        </main>
    );
};

export default Page;