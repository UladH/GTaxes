import { createMap, forMember, mapFrom, MappingProfile } from "@automapper/core";
import { CurrencyModel } from "../../models/inner/currency/currency.model";
import { CurrencyInputModel } from "../../models/input/currency/currency-input.model";

export const currencyProfile: MappingProfile = (mapper) => {
    createMap(
        mapper,
        CurrencyInputModel,
        CurrencyModel,
        forMember(
            (dest) => dest.code,
            mapFrom((source) => source.code)
        ),
        forMember(
            (dest) => dest.name,
            mapFrom((source) => source.name)
        ),
    );
};