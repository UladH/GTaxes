import { createMap, forMember, mapFrom, MappingProfile } from "@automapper/core";
import { CurrencyDatestampModel } from "../../models/inner/currency/currency-datestamp.model";
import { CurrencyModel } from "../../models/inner/currency/currency.model";
import { CurrencyDatestampInputModel } from "../../models/input/currency/currency-datestamp-input.model";
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
    
    createMap(
        mapper,
        CurrencyDatestampInputModel,
        CurrencyDatestampModel,
        forMember(
            (dest) => dest.code,
            mapFrom((source) => source.code)
        ),
        forMember(
            (dest) => dest.name,
            mapFrom((source) => source.name)
        ),
        forMember(
            (dest) => dest.date,
            mapFrom((source) => new Date(source.validFromDate))
        ),
        forMember(
            (dest) => dest.rate,
            mapFrom((source) => source.rate / source.quantity)
        ),
    );
};