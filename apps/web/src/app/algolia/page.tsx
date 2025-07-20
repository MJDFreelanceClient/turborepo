"use client"

import React, {useEffect, useState} from 'react';
import { liteClient as algoliasearch } from 'algoliasearch/lite';
import { InstantSearch, SearchBox, RefinementList, Hits, Pagination, useRange, useRefinementList   } from 'react-instantsearch';
import { RangeSlider as SpectrumRangeSlider } from '@adobe/react-spectrum';

const searchClient = algoliasearch(process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!, process.env.NEXT_PUBLIC_ALGOLIA_API_KEY!);

function FatRangeFilter(props:any) {
    const { start, range, canRefine, refine } = useRange(props);
    const { min, max } = range;
    const [value, setValue] = useState({ start: min ?? 0, end: max ?? 0 });

    const from = Math.max(min!, (Number.isFinite(start[0]) ? start[0] : min)!);
    const to = Math.min(max!, (Number.isFinite(start[1]) ? start[1] : max)!);

    useEffect(() => {
        setValue({ start: from, end: to });
    }, [from, to]);

    return (
        <SpectrumRangeSlider
            label="Fat range"
            minValue={min}
            maxValue={max}
            value={value}
            onChange={setValue}
            onChangeEnd={({ start, end }) => refine([start, end])}
            isDisabled={!canRefine}
        />
    );
}

function MultiSelectRefinement({ attribute }) {
    const { items, refine } = useRefinementList({ attribute });

    return (
        <div>
            <h4>{attribute}</h4>
            <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                {items.map(item => (
                    <li key={item.label}>
                        <label style={{ cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                checked={item.isRefined}
                                onChange={() => refine(item.value)}
                                style={{ marginRight: 6 }}
                            />
                            {item.label} ({item.count})
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function Hit({ hit }:{hit:any}) {
    return (
        <article className={`flex`} style={{ border: '1px solid #ddd', padding: 16, borderRadius: 8 }}>
            <img
                src={hit.image}
                alt={hit.name}
                style={{ width: '100%', height: 'auto', borderRadius: 6, objectFit: 'cover', maxWidth: 400 }}
            />
            <section>
                <h2 style={{ marginTop: 12, marginBottom: 4 }}>Name: {hit.name}</h2>
                {hit.brand && <p style={{ fontStyle: 'italic', color: '#555' }}>Brand: {hit.brand}</p>}

                {hit.ingredients && (
                    <>
                        <h4>Ingredients</h4>
                        <p style={{ fontSize: 14, lineHeight: 1.4, color: '#444' }}>{hit.ingredients}</p>
                    </>
                )}

                {hit.categories?.length > 0 && (
                    <>
                        <h4>Categories</h4>
                        <ul style={{ paddingLeft: 20, marginTop: 4, marginBottom: 12 }}>
                            {hit.categories.slice(0,3).map((cat:any) => (
                                <li key={cat} style={{ fontSize: 13, color: '#666' }}>{cat}</li>
                            ))}
                        </ul>
                    </>
                )}

                {hit.nutrients && (
                    <>
                        <h4>Nutrients (per 100g)</h4>
                        <ul style={{ paddingLeft: 20 }}>
                            {['energy_kcal', 'fat', 'sugar', 'salt'].map((key) => (
                                <li key={key} style={{ fontSize: 14 }}>
                                    <strong>{key.replace('_', ' ').toUpperCase()}:</strong> {hit.nutrients[key] ?? 'N/A'}
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </section>
        </article>
    );
}


const Page = () => {
    return (
        <InstantSearch indexName="fem-qa-food" searchClient={searchClient}>
            <SearchBox /> <FatRangeFilter attribute={"nutrients.fat"} />
            <MultiSelectRefinement attribute="categories" />
            <RefinementList attribute="brand" />
            <Hits hitComponent={Hit} />
            <Pagination />
        </InstantSearch>
    );
};

export default Page;