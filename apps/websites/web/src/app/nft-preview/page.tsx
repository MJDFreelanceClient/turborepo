import effects from "./@styles/effects.module.css";
import  IconClock from "./@icons/icon-clock.svg";
import IconEthereum from "./@icons/icon-ethereum.svg";
import IconView from "./@icons/icon-view.svg";

const Page = () => {
    return (
        <main className={`py-9 px-3`}>
            <article className={`flex flex-col-reverse gap-6 bg-blue-900 ${effects.nftShadow} rounded-[15px] p-6 w-fit max-w-[350px] mx-auto`}>
                <div className={`flex flex-col gap-6`}>
                    <header className={`flex flex-col gap-4`}>
                        <h2 className={`text-tablet-1 text-white`}>Equilibrium #3429</h2>
                        <p className={`text-tablet-2 text-blue-500`}>
                            Our Equilibrium collection promotes balance and calm.
                        </p>
                    </header>
                    <div className={`flex justify-between items-center`}>
                        <span className={`text-cyan-400 text-preset-4 flex items-center gap-2`}>
                            <IconEthereum />
                            0.041 ETH</span>
                        <span className={`text-preset-3 text-blue-500 flex items-center gap-2`}>
                            <IconClock />
                            3 days left</span>
                    </div>
                    <hr className={`text-blue-800`} />
                    <span className={`flex items-center gap-4 text-preset-3 text-blue-500`}>
                            <img src="/nft-preview/images/image-avatar.png" className={`h-8 w-8 border border-white rounded-full`} />
                            <dl className={`flex items-center gap-2`}>
                                <dt>Creation of</dt>
                                <dd className={`text-white`}>Jules Wyvern</dd>
                            </dl>
                    </span>
                </div>
                <div className={`group rounded-[8px] relative overflow-hidden cursor-pointer`}>
                    <img src="/nft-preview/images/image-equilibrium.jpg" className={`rounded-[8px]`} />
                    <div
                        className={`absolute inset-0 flex items-center justify-center 
              opacity-0 group-hover:opacity-100 pointer-events-none 
              before:absolute before:inset-0 before:bg-cyan-400
              before:opacity-0 group-hover:before:opacity-50 
              before:transition-opacity before:duration-300`}
                    >
                        <IconView className={`relative`} />
                    </div>


                </div>
            </article>
        </main>
    );
};

export default Page;