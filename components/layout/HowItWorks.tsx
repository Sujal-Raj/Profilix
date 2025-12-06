import { MoveRight, Upload, Sparkles, Rocket } from "lucide-react";

export default function HowItWorksPage() {
  const steps = [
    {
      number: "1",
      title: "Upload Your Projects",
      description: "Simply drag and drop your work or upload files directly from your device.",
      icon: Upload,
      delay: "0ms"
    },
    {
      number: "2",
      title: "AI Magic",
      description: "Our AI analyzes your content and suggests the perfect layout and style for your portfolio.",
      icon: Sparkles,
      delay: "100ms"
    },
    {
      number: "3",
      title: "Launch Your Portfolio",
      description: "Publish instantly and share your custom URL. Update anytime with ease.",
      icon: Rocket,
      delay: "200ms"
    }
  ];

  return (
    <>
      <section className="py-20 bg-white dark:bg-black relative overflow-hidden">
        {/* Subtle background gradient */}
        {/* <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-transparent dark:from-gray-900/30 dark:to-transparent pointer-events-none" /> */}
        <div className="absolute inset-0 bg-white dark:bg-black pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-20">
            {/* <div className="inline-block mb-4">
              <div className="group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800">
                <div className="inline-flex items-center justify-center px-2 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                  <span className="text-sm font-medium">⚡Simple Process</span>
                </div>
              </div>
            </div> */}
            <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-2">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 font-light max-w-2xl mx-auto">
              Three simple steps to launch your professional portfolio
            </p>
          </div>

          {/* Steps with connecting line */}
          <div className="relative">
            {/* Connecting line - hidden on mobile */}
            <div className="hidden md:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent" 
                 style={{ top: '4rem' }} />
            
            <div className="grid md:grid-cols-3 gap-8 md:gap-12 relative">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div 
                    key={index} 
                    className="group relative"
                    style={{ animationDelay: step.delay }}
                  >
                    {/* Card with hover effect */}
                    <div className="relative bg-white dark:bg-black border border-gray-100 dark:border-gray-900 rounded-2xl p-8 transition-all duration-300 hover:border-gray-200 dark:hover:border-gray-800 hover:shadow-xl hover:-translate-y-1 shadow shadow-gray-800 ">
                      {/* Step number badge */}
                      <div className="relative mb-6">
                        <div className="w-16 h-16 bg-black dark:bg-white rounded-2xl flex items-center justify-center mx-auto transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-lg">
                          <Icon className="w-7 h-7 text-white dark:text-black" />
                        </div>
                        
                        {/* Floating number indicator */}
                        {/* <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-100 dark:bg-gray-900 border-2 border-white dark:border-black rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                          <span className="text-sm font-bold text-black dark:text-white">
                            {step.number}
                          </span>
                        </div> */}
                      </div>

                      {/* Content */}
                      <div className="text-center">
                        <h3 className="text-xl font-bold text-black dark:text-white mb-3 transition-colors duration-300">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-light">
                          {step.description}
                        </p>
                      </div>

                      {/* Hover glow effect */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-black/5 to-transparent dark:from-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>

                    {/* Arrow connector - hidden on mobile and last item */}
                    {index < steps.length - 1 && (
                      <div className="hidden md:block absolute top-16 -right-6 z-10">
                        <MoveRight className="w-6 h-6 text-gray-300 dark:text-gray-700 transition-all duration-300 group-hover:text-black dark:group-hover:text-white group-hover:translate-x-1" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA Section */}
          {/* <div className="mt-20 text-center">
            <p className="text-gray-500 dark:text-gray-500 mb-6 text-sm font-medium uppercase tracking-wider">
              Ready to get started?
            </p>
            <button className="group relative bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-xl text-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl inline-flex items-center">
              <span className="relative z-10 flex items-center">
                Create Your Portfolio
                <MoveRight className="ml-2 size-5 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gray-800 dark:bg-gray-200 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300" />
            </button>
          </div> */}
        </div>
      </section>
    </>
  );
}