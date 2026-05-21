import { ReactElement, lazy, createElement, Suspense } from 'react';
import Loader from '../components/Loader';

// Server components need direct imports (can't be lazy-loaded the same way)
import ServiceGrid from '../components/ServiceGrid';
import TeamGrid from '../components/TeamGrid';
import ContactGrid from '../components/ContactGrid';
import CategoryOverview from '../components/CategoryOverview';
import ServicesOverview from '../components/ServicesOverview';
import EventGrid from '../components/EventGrid';

// Map of server‐side async components that bypass lazy()
const SERVER_COMPONENTS: Record<string, any> = {
  ServiceGrid,
  TeamGrid,
  ContactGrid,
  CategoryOverview,
  ServicesOverview,
  EventGrid,
};

export default function componentResolver(section: any, index: number): ReactElement {

    // Component names do look like 'category.component-name' => lowercase and kebap case
    const names: string[] = section.__component.split('.')

    // Get category name
    const category = names[0]

    // Get component name
    const component = names[1]

    ///////////////////////////////////////////////
    // Convert the kebap-case name to PascalCase
    const parts: string[] = component.split('-')

    let componentName = ''

    parts.forEach( s => {
        componentName += capitalizeFirstLetter(s)
    })
    ///////////////////////////////////////////////

    //console.log(`ComponentResolver: Category => ${category} | Component => ${componentName} | Path => ../components/${componentName}`)

    // Check if this is a server component (async data-fetching components)
    if (SERVER_COMPONENTS[componentName]) {
      const ServerComponent = SERVER_COMPONENTS[componentName];
      return <ServerComponent data={section} key={index} />;
    }

    // The path for dynamic imports cannot be fully dynamic.
    // Webpack requires a static part of the import path at the beginning. 
    // All modules below this path will be included in the bundle and be available for dynamic loading
    // Besides, this will result in code splitting and better performance.
    // See https://webpack.js.org/api/module-methods/#import-1
    
    // Use react lazy loading to import the module. By convention: The file name needs to match the name of the component (what is a good idea)
    let module = lazy(() => import( `../components/${componentName}`))

    // Create react element. The 'type' argument needs to be a FunctionComponent, not a string
    const reactElement = createElement(module, {data: section, key: index})

    return (
        <Suspense fallback={<Loader />} key={index}>
            {reactElement}
        </Suspense>
    )
}

function capitalizeFirstLetter(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}