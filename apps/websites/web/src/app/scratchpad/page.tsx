const Page = () => {
    return (
        <div className="relative min-h-screen">
            {/* Header and aside wrapper */}
            <div className="relative z-10 ">
                <header className="bg-black py-6" />
                <aside className="absolute top-full left-0 bottom-0 w-[200px] h-[calc(100vh-3rem)] bg-pink-600 border-8 border-cyan-400" />
            </div>

            {/* Main content that is not pushed by the aside */}
            <div className="relative z-0 min-h-screen bg-green-400 border-2 border-white">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab adipisci dolore, enim est ex excepturi expedita fugit hic libero modi nemo nesciunt odio quis similique sunt tenetur ullam voluptas voluptate!
            </div>
        </div>
    );
};

export default Page;