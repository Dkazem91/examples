import { Store, State } from './types.d'
import { configStore } from './store'

type MapStateToPropsFunction = (
  component: any,
  mapState: (state: State) => any
) => void
type MapDispatchToPropsFunction = (
  component: any,
  mapState: { [key: string]: Function }
) => void

export declare interface BearerStore extends Store {
  store: Store
  mapStateToProps: MapStateToPropsFunction
  mapDispatchToProps: MapDispatchToPropsFunction
}

export type PromisifiedStore = Promise<BearerStore>

function getStore(): Store {
  return (window[`BEARER_SCENARIO_ID_store`] =
    window[`BEARER_SCENARIO_ID_store`] || configStore())
}

function BearerState(target: any, key: string) {
  const getter = (): PromisifiedStore => {
    return new Promise<BearerStore>((resolve, _reject) => {
      const mapDispatchToProps: MapDispatchToPropsFunction = function(
        component: any,
        props: any
      ) {
        console.log('[BEARER]', 'component', component, props)
        Object.keys(props).forEach(actionName => {
          const action = props[actionName]
          Object.defineProperty(component, actionName, {
            get: () => (...args: any[]) =>
              action(...args)(getStore().dispatch, getStore().getState),
            configurable: true,
            enumerable: true
          })
        })
      }

      const mapStateToProps: MapStateToPropsFunction = function(
        component: any,
        mapState: Function
      ) {
        // TODO: Don't listen for each component
        const _mapStateToProps = (_component: any, _mapState: any) => {
          const mergeProps = mapState(getStore().getState())
          Object.keys(mergeProps).forEach(newPropName => {
            let newPropValue = mergeProps[newPropName]
            component[newPropName] = newPropValue
            // TODO: can we define new props and still have change detection work?
          })
        }

        getStore().subscribe(() => _mapStateToProps(component, mapState))

        _mapStateToProps(component, mapState)
      }

      resolve({
        store: getStore(),
        mapStateToProps,
        mapDispatchToProps
      } as BearerStore)
    })
  }

  const setter = () => {}

  if (delete target[key]) {
    Object.defineProperty(target, key, {
      get: getter,
      set: setter
    })
  }
}

export function connect(
  mapStateToProps?: Function,
  mapDispatchToProps?: Function
) {
  return (store, component) => {
    if (mapStateToProps) {
      store.mapStateToProps(component, mapStateToProps.bind(component))
    }
    if (mapDispatchToProps) {
      store.mapDispatchToProps(
        component,
        mapDispatchToProps.bind(component)(store.store.getState())
      )
    }
  }
}

export default BearerState
