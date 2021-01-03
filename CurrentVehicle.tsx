// react
import React, {
    PropsWithChildren,
    useCallback,
    useContext,
    useMemo,
    useState,
} from 'react';
// application

export interface IVehicle {
    id: number;
    year: number;
    make: string;
    model: string;
    engine: string;
}


type ContextData = readonly [
    vehicle: IVehicle | null,
    setVehicle: (value: IVehicle | null) => void,
];

const CurrentVehicleContext = React.createContext<ContextData>([null, () => {}]);

export function useCurrentVehicle() {
    return useContext(CurrentVehicleContext);
}

export function CurrentVehicleScopeProvider(props: PropsWithChildren<{}>) {
    const { children } = props;
    const [initialVehicle] = useCurrentVehicle();
    const [vehicle, setVehicle] = useState<IVehicle | null>(initialVehicle);
    // eslint-disable-next-line no-undef
    const value = useMemo(() => [vehicle, setVehicle] as const, [vehicle, setVehicle]);

    return (
        <CurrentVehicleContext.Provider value={value}>
            {children}
        </CurrentVehicleContext.Provider>
    );
}
