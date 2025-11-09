export default function HowItWorksPage(){
   const steps = [
    {
      number: "1",
      title: "Upload Your Projects",
      description: "Simply drag and drop your work or upload files directly from your device."
    },
    {
      number: "2",
      title: "AI Magic",
      description: "Our AI analyzes your content and suggests the perfect layout and style for your portfolio."
    },
    {
      number: "3",
      title: "Launch Your Portfolio",
      description: "Publish instantly and share your custom URL. Update anytime with ease."
    }
  ];

  return (
    <>
    <section className="py-20 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-black dark:text-white mb-1">How It Works</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 font-light">3 Easy Steps to Your Dream Portfolio</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center ">
              <div className="w-8 h-8 bg-black dark:bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white dark:text-black">{step.number}</span>
              </div>
              <h3 className="text-lg font-bold text-black dark:text-white mb-1">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-tight font-extralight ">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section>
          <div className={`relative w-full py-4 sm:py-6 md:py-8 lg:py-10 overflow-hidden bg-white dark:bg-black`}>
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white/50 to-transparent dark:from-black dark:via-black/50 dark:to-transparent z-10 pointer-events-none" />
      
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[6rem] xl:text-[8rem] 2xl:text-[10rem] text-center tracking-tighter text-gray-900 dark:text-gray-100 opacity-5 dark:opacity-10 select-none pointer-events-none whitespace-nowrap font-semibold">
        PORTFOLIO
      </h2>
    </div>
    </section>

    <section className="py-20 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-1">
          Ready to Create Your Portfolio?
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Join thousands of creators who trust our platform to showcase their best work.
        </p>
        <button className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg text-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition">
          Get Started
        </button>
      </div>
    </section>

    </>
  );
}