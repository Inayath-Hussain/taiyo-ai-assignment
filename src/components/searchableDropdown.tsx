import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectCountries } from "../redux/countriesSlice";

interface Iprops {
    countryRef: React.MutableRefObject<string>
}

const SearchableDropdown: React.FC<Iprops> = ({ countryRef }) => {

    const inputRef = useRef<HTMLInputElement | null>(null)
    const ulRef = useRef<HTMLUListElement | null>(null)

    const countries = useSelector(selectCountries)
    const [countriesState, setCountriesState] = useState<string[]>(countries)

    const [hasFocus, setHasFocus] = useState(false);

    useEffect(() => {

        const handleClick = (e: MouseEvent) => {
            if (!inputRef.current?.contains(e.target as Node) && !ulRef.current?.contains(e.target as Node)) {
                setHasFocus(false)
            }
        }

        document.addEventListener('click', handleClick)

        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [])

    useEffect(() => {
        setCountriesState(countries)
    }, [countries])


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        countryRef.current = e.target.value

        const regex = new RegExp(e.target.value)

        const localCountries: string[] = []

        countries.forEach(c => {
            if (regex.test(c)) localCountries.push(c)
        })

        setCountriesState(localCountries)
    }

    const handleSelect = (c: string) => {
        if (inputRef.current) {
            inputRef.current.value = c;
            setHasFocus(false);
            countryRef.current = c
        }
    }

    return (
        <div className='relative'>
            <input ref={inputRef} id="country" onFocus={() => setHasFocus(true)}
                type="text" className='mx-2 outline-0 p-2 rounded-md
                mobile-end:rounded-lg' defaultValue={countryRef.current} onChange={handleInputChange} />

            {(countriesState.length > 0 && hasFocus && inputRef.current) &&
                <ul ref={ulRef} className='absolute mt-2 w-full rounded-md bg-white max-h-28 overflow-y-scroll lg:max-h-48'>
                    {countriesState.map(c => (
                        <li key={c} onClick={() => handleSelect(c)}
                            className='px-3 my-2 cursor-pointer hover:bg-cyan-100'>{c}</li>
                    ))}
                </ul>}
        </div>
    );
}

export default SearchableDropdown;