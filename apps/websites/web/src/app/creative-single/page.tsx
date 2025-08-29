import colors from "@/app/creative-single/@styles/colors.module.css";
import text from "@/app/creative-single/@styles/text.module.css";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/Carousel";

const Page = () => {
    return (
        <div className={`flex flex-col min-h-screen max-w-[1440px] mx-auto ${colors.setup} ${text.setup}`}>
            <header className={`flex items-center`}>
                <div className={`max-w-[50%] w-full pl-[165px]`}>
                    <img src="/creative-single/images/desktop/logo.svg" alt="" />
                </div>
                <nav className={`max-md:hidden flex items-center bg-primary py-14 px-17 gap-8 text-white max-w-[50%] w-full text-preset-2 text-size-[1rem] `}>
                    <a href="">About</a>
                    <a href="">Service</a>
                    <a href="">Projects</a>
                    <a className={`ml-4 py-6 px-12 bg-neutral-900 text-preset-3 text-size-[1rem]`}>Schedule a Call</a>
                </nav>
            </header>

            <article className={`splash md:ml-[165px] md:grid md:grid-areas-[content] flex flex-col-reverse items-center`}>
                <div className={`flex flex-col gap-10 grid-area-[content] max-w-[730px] z-10`}>
                    <h1 className={`text-preset-1`}>Branding & website design agency</h1>
                    <p className={`text-preset-2`}>
                        We specialize in visual storytelling by creating cohesive brand and website design solutions for
                        small businesses, giving lasting impressions to audiences in a digital world.
                    </p>
                    <a className={`px-10 py-6 bg-primary w-fit text-white text-preset-3`}>Learn More</a>
                </div>
                <img src="/creative-single/images/desktop/image-hero.jpg" alt="" className={`grid-area-[content] justify-self-end`} />
            </article>

            <section className="flex flex-col-reverse md:flex-row-reverse md:items-stretch md:h-[100vh]">
                <div className="h-full w-full flex flex-col  md:justify-center md:pb-[200px] bg-black md:pl-[50px]">
                    <div className={`  text-white flex flex-col md:mx-auto gap-10 md:justify-center h-full`}>
                            <h2 className={`text-preset-4 max-w-[10ch]`}>Design is strategic.</h2>
                            <p className={`max-w-[45ch]`}>
                                “A well-crafted design strategy consistently produces desired outcomes and brand awareness.
                                We are firm believers that success lies in creative collaboration with our clients.”
                            </p>
                            <a>Schedule a call</a>
                    </div>
                </div>
                <img src="/creative-single/images/desktop/image-strategic.jpg" alt="" />
            </section>

            <section className={`flex max-md:flex-col md:-mt-[200px] items-stretch max-md:bg-primary max-md:py-16`}>
                <h2 className={`max-md:text-white md:translate-x-[150px] md:ml-auto md:py-[200px] grid self-center text-preset-4 max-w-[570px] mr-[30px]`}>
                    Our approach for creating a winning brand</h2>
                <div className={`w-[75%] bg-primary flex flex-col items-center justify-center gap-14 md:py-[200] md:pl-[160px] md:min-w-[438px]`}>
                    <div className={`flex flex-col gap-6 relative pt-11 pl-15 text-white`}>
                        <div className={`absolute top-0 left-0 text-preset-1 z-0 text-secondary`}>01</div>
                        <h3 className={`relative`}>Brand Strategy</h3>
                        <p className={`relative max-w-[40ch]`}>
                            Brand strategy is critical for long-term success. Outshining competitors and capturing the
                            target audience are key.
                        </p>
                    </div>
                    <div className={`flex flex-col gap-6 relative pt-11 pl-15 text-white`}>
                        <div className={`absolute top-0 left-0 text-preset-1 z-0 text-secondary`}>01</div>
                        <h3 className={`relative`}>Brand Strategy</h3>
                        <p className={`relative max-w-[40ch]`}>
                            Brand strategy is critical for long-term success. Outshining competitors and capturing the
                            target audience are key.
                        </p>
                    </div>
                    <div className={`flex flex-col gap-6 relative pt-11 pl-15 text-white`}>
                        <div className={`absolute top-0 left-0 text-preset-1 z-0 text-secondary`}>01</div>
                        <h3 className={`relative`}>Brand Strategy</h3>
                        <p className={`relative max-w-[40ch]`}>
                            Brand strategy is critical for long-term success. Outshining competitors and capturing the
                            target audience are key.
                        </p>
                    </div>
                </div>
            </section>

            <Carousel>
                <CarouselContent>
                    <CarouselItem>
                        <section className={`flex justify-end`}>
                            <div className={`px-[165px] bg-neutral-900 h-fit text-white z-10`}>
                                <h2>Brand Naming & Guidelines</h2>
                                <CarouselPrevious unstyled={true} useAbsolute={false} className={`disabled:opacity-50`} >Prev</CarouselPrevious>
                                <CarouselNext unstyled={true} useAbsolute={false} className={`disabled:opacity-50`}  />
                            </div>
                            <img src="/creative-single/images/desktop/image-slide-1.jpg" alt="" className={`-ml-[50px]`} />
                        </section>
                    </CarouselItem>
                    <CarouselItem>
                        <section className={`flex justify-end`}>
                            <div className={`px-[165px] bg-neutral-900 h-fit text-white z-10`}>
                                <h2>Brand Naming & Guidelines</h2>
                                <CarouselPrevious unstyled={true} useAbsolute={false} className={`disabled:opacity-50`} >Prev</CarouselPrevious>
                                <CarouselNext unstyled={true} useAbsolute={false} className={`disabled:opacity-50`}  />
                            </div>
                            <img src="/creative-single/images/desktop/image-slide-1.jpg" alt="" className={`-ml-[50px]`} />
                        </section>
                    </CarouselItem>
                    <CarouselItem>
                        <section className={`flex justify-end`}>
                            <div className={`px-[165px] bg-neutral-900 h-fit text-white z-10`}>
                                <h2>Brand Naming & Guidelines</h2>
                                <CarouselPrevious unstyled={true} useAbsolute={false} className={`disabled:opacity-50`} >Prev</CarouselPrevious>
                                <CarouselNext unstyled={true} useAbsolute={false} className={`disabled:opacity-50`}  />
                            </div>
                            <img src="/creative-single/images/desktop/image-slide-1.jpg" alt="" className={`-ml-[50px]`} />
                        </section>
                    </CarouselItem>
                </CarouselContent>
            </Carousel>

            <section className={`flex max-md:flex-col md:items-center py-[120px] relative md:px-[165px] md:justify-between`}>
                <h2 className={`text-preset-4 max-w-[20ch]`}>Let&#39;s build something great together.</h2>
                <a className={`md:ml-4 py-6 px-12 bg-primary text-white h-fit w-fit text-preset-3 text-size-[1rem]`}>Schedule a Call</a>
            </section>
        </div>
    );
};

export default Page;