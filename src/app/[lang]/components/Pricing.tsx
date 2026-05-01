interface Feature {
  id: string;
  attributes: {
    name: string;
  };
}

interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  pricePeriod: string;
  isRecommended: boolean;
  product_features: {
    data: Feature[];
  };
}

interface PriceProps {
  data: {
    id: string;
    title: string;
    plans: Plan[];
  };
}

export default function Pricing({ data }: PriceProps) {
  return (
    <section className="section-padding bg-ami-gray-warm">
      <div className="container-ami">
        <div className="max-w-2xl mx-auto mb-12 text-center">
          <span className="text-sm font-semibold tracking-wider uppercase text-ami-teal">
            Pricing
          </span>
          <h2 className="text-3xl font-bold text-ami-navy mt-2 lg:text-4xl">{data.title}</h2>
        </div>
        <div className="flex flex-wrap items-stretch max-w-5xl mx-auto">
          {data.plans.map((plan: Plan) => (
            <div
              key={plan.id}
              className="w-full p-4 mb-8 sm:mx-40 lg:mx-0 lg:w-1/3 lg:mb-0"
            >
              <div
                className={`flex flex-col p-6 space-y-6 rounded-card min-h-[475px] min-w-[300px] border transition-default ${
                  plan.isRecommended
                    ? "bg-ami-teal text-white border-ami-teal shadow-elevated"
                    : "bg-white text-ami-slate border-ami-gray-200 shadow-card"
                }`}
              >
                <div className="space-y-2">
                  <h4 className="text-2xl font-bold mb-4">{plan.name}</h4>
                  <span className="text-5xl font-bold">
                    {plan.price}
                    <span
                      className={`ml-1 text-sm tracking-wide ${
                        plan.isRecommended ? "text-white/80" : "text-ami-teal"
                      }`}
                    >
                      {plan.pricePeriod.toLowerCase()}
                    </span>
                  </span>
                </div>
                <p
                  className={`mt-3 leading-relaxed text-sm ${
                    plan.isRecommended ? "text-white/90" : "text-ami-gray-400"
                  }`}
                >
                  {plan.description}
                </p>
                <ul
                  className={`flex-1 mb-6 space-y-2 ${
                    plan.isRecommended ? "text-white/90" : "text-ami-slate"
                  }`}
                >
                  {plan.product_features.data.map((feature: Feature) => (
                    <li key={feature.id} className="flex items-start space-x-2 text-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className={`flex-shrink-0 w-5 h-5 mt-0.5 ${
                          plan.isRecommended ? "text-white" : "text-ami-teal"
                        }`}
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span>{feature.attributes.name}</span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className={`inline-block px-5 py-3 font-medium text-sm tracking-wider text-center rounded-md transition-default ${
                    plan.isRecommended
                      ? "bg-white text-ami-teal hover:bg-ami-gray-warm"
                      : "bg-ami-red text-white hover:bg-ami-red-dark"
                  }`}
                >
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
