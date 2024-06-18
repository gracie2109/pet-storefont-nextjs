'use client';

import {Shell} from "@/components/shell";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import React from "react";
import {Button} from "@/components/ui/button"


import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useFieldArray, useForm} from "react-hook-form";
import {RichTextEditor} from "@/components/rich-text-editor";
import {InfoInput} from "@/components/info-input";
import {Checkbox} from "@/components/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {CheckedState} from "@radix-ui/react-checkbox";
import {countries, weightUnit, rawCollection,sampleOption} from "@/lib/contants"
import {Info, PlusCircle, Trash} from "lucide-react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import MultipleSelector from "@/components/multiple-selector";
import {CollapsibleTable} from "@/components/collapsible-table";
import {SelectOptions} from "@/types";
import {profitAndMarginAlg} from "@/lib/helpers";
import {toast} from "react-hot-toast";

type TVariantOption = {
    name: string,
    value: SelectOptions[]
}

export default function ProductCreatePage() {
    const [formState, setFormState] = React.useState(null);
    const [isPhysical, setIsPhysical] = React.useState<CheckedState>(false)
    const form = useForm({
        defaultValues: {
            name: "",
            price: "",
            cost:"",
            description: "",
            cost_price: "",
            status: 'active',
            weight: "",
            unit: "",
            country: "",
            margin: "",
            profit: "",
            tags: [],
            collections: [],
            variant_options: [{
                name: "",
                value:[]
            }],
            variant_products:[
                {
                    price: "",
                    quantity: "",
                    name:"",
                    children: [ {
                        name:"",
                        price: "",
                        quantity: ""
                    }]

                }
            ]
        }
    });
    const {fields, append, remove} = useFieldArray({
        name: "variant_options",
        control: form.control,
    });


    const [collapse, setCollapse] = React.useState<string[]>([]);
    const [variantGroup, setVariantGroup] = React.useState<string | null>(form.getValues('variant_options')?.[0]?.name || null);



    const handleChangeOptionValue = (optionValues:any[], index:any) => {
        if(optionValues.length == 0 ){
            form.setError(index,{
                message:` ${index.split('.').at(-1)} is required`
            })
        }else{
            form.clearErrors([index])
        }
    }

    const submitHandlerPrd = () => {

    }

    React.useEffect(() => {
        const data =  profitAndMarginAlg(
            +form.watch('price'),
            +form.watch('cost_price'),
            +form.watch('cost')
        );
        if(data) {
            form.setValue('profit', data.toString());
            form.setValue('margin', `${data}%`);
        }
    },[form.watch('price') ,form.watch('cost_price'),form.watch('cost') ])


    const renderPlaceHolder = (index: number) => {
        const currentName = (form.getValues('variant_options').at(index) as TVariantOption).name as string
        let placeholder= ""
        switch (currentName) {
            case "Color": placeholder="Black";break;
            case "Size" : placeholder = "Medium";break;
            case "Type" : placeholder = "Custom";break;
            case "Material" : placeholder = "Cotton";break;
            default: placeholder = "";break;
        }
        return placeholder
    }

    return (
        <Shell variant="sidebar" className="relative">
            <Form {...form}>
                <form className=" 2xl:grid 2xl:grid-cols-6  gap-6" onSubmit={form.handleSubmit(submitHandlerPrd)}>

                    <div className="left_side  2xl:col-span-4 space-y-6">
                        <div id="general" className="space-y-6">
                            <Card className="rounded-sm">
                                <CardHeader>
                                    <CardTitle>General</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Product name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="name" {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Description</FormLabel>
                                                <FormControl>
                                                    {/*<RichTextEditor field={field}/>*/}

                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </Card>
                        </div>

                        <div id="price">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Price</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid grid-cols-2 sm:grid-cols-1 2xl:grid-cols-2 gap-3">
                                        <FormField
                                            control={form.control}
                                            name="price"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Product price</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="price" {...field} />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />

                                        <InfoInput
                                            form={form} label="Compare-at price"
                                            inputName={'cost_price'}
                                            desc={<div><p>Show the higher price to show sale off price</p>  <p>The price
                                                will show: <b>2.5 USD <span
                                                    className={"line-through"}>3.5 USD</span></b></p>
                                            </div>}

                                        />
                                    </div>
                                    <div className="grid  xs:grid-cols-1 2xl:grid-cols-3 gap-3 ">


                                        <InfoInput
                                            form={form} label="Cost per item"
                                            inputName={'cost'}
                                            desc={"Customer won't see it"}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="profit"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Profit</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="profit" {...field} readOnly/>
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="margin"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>margin</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="margin" {...field} readOnly/>
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>


                        <div id="warehouse">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Shipping</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">

                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="terms" onCheckedChange={(e: CheckedState) => {
                                            setIsPhysical(e);
                                            if (!e) {
                                                form.resetField('weight');
                                                form.resetField('unit');
                                                form.resetField('country');
                                            }
                                        }}/>
                                        <label
                                            htmlFor="terms"
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            This is a physical product
                                        </label>
                                    </div>


                                    {isPhysical ? (
                                        <>
                                            <div>
                                                <label htmlFor="weight" className="my-3">Weight</label>
                                                <br/>
                                                <div className="flex gap-3 items-center">

                                                    <FormField
                                                        control={form.control}
                                                        name="weight"
                                                        render={({field}) => (
                                                            <FormItem>
                                                                <FormControl>
                                                                    <Input placeholder="weight" {...field}/>
                                                                </FormControl>
                                                                <FormMessage/>
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control}
                                                        name="unit"
                                                        render={({field}) => (
                                                            <FormItem>
                                                                <Select onValueChange={field.onChange}
                                                                        defaultValue={field.value || 'g'}>
                                                                    <FormControl>
                                                                        <SelectTrigger>
                                                                            <SelectValue
                                                                                placeholder={field.value || 'Choose unit'}/>
                                                                        </SelectTrigger>
                                                                    </FormControl>
                                                                    <SelectContent>
                                                                        {weightUnit?.map((i) => (
                                                                            <SelectItem value={i.value}
                                                                                        key={i.name}>{i.name}</SelectItem>
                                                                        ))}

                                                                    </SelectContent>
                                                                </Select>
                                                                <FormMessage/>
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                            <div id={"country"}>
                                                <FormField
                                                    control={form.control}
                                                    name="unit"
                                                    render={({field}) => (
                                                        <FormItem>
                                                            <FormLabel className="flex gap-3 items-center">
                                                                <p>Country/ Origin</p>
                                                                <TooltipProvider>
                                                                    <Tooltip>
                                                                        <TooltipTrigger>
                                                                            <Info className="w-4 text-gray-500"/>
                                                                        </TooltipTrigger>
                                                                        <TooltipContent>
                                                                            <div className="max-w-[150px]">In most case,
                                                                                where
                                                                                the product was manufacture or assembled
                                                                            </div>
                                                                        </TooltipContent>
                                                                    </Tooltip>
                                                                </TooltipProvider>
                                                            </FormLabel>
                                                            <Select onValueChange={field.onChange}
                                                                    defaultValue={field.value || 'g'}>
                                                                <FormControl>
                                                                    <SelectTrigger>
                                                                        <SelectValue placeholder={field.value || 'Choose origin'}/>
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                    {countries?.map((i) => (
                                                                        <SelectItem value={i.value}
                                                                                    key={i.name}>{i.name}</SelectItem>
                                                                    ))}

                                                                </SelectContent>
                                                            </Select>
                                                            <FormMessage/>
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </>
                                    ) : null}


                                </CardContent>
                            </Card>
                        </div>
                        <div id="variant">
                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        Variant
                                    </CardTitle>
                                    <CardContent className="p-0 space-y-8">
                                        <div id="variant_options_list">
                                            <div className={" space-y-6 my-3 p-3 rounded-md"}>
                                                {fields.map((field, index) => {
                                                    return (
                                                        <div key={index}>

                                                            <div className="rounded-md border border-primary p-2">
                                                                <div className="flex justify-end">
                                                                    <Button type="button" variant="ghost"
                                                                            onClick={() => {
                                                                                if(form.getValues('variant_options').length === 1){
                                                                                    form.resetField('variant_options');
                                                                                }else {
                                                                                    remove(index)
                                                                                }
                                                                            }}><Trash
                                                                        className="w-4 h-4"/></Button>

                                                                    {(form.getValues(`variant_options.${index}.name`).length > 0 && form.getValues(`variant_options.${index}.value`).length > 0) && (
                                                                        <>
                                                                            {!collapse.includes(field.id) ?
                                                                                <Button type="button" variant="ghost"
                                                                                        onClick={() => {
                                                                                            setCollapse([...new Set([...collapse, field.id])]);
                                                                                        }}>
                                                                                    Done
                                                                                </Button> :
                                                                                <Button type="button" variant="ghost"
                                                                                        onClick={() => {
                                                                                            setCollapse((prev) => prev.filter((i) => i !== field.id));
                                                                                        }}>
                                                                                    Edit
                                                                                </Button>
                                                                            }
                                                                        </>
                                                                    )}
                                                                </div>

                                                                {collapse.includes(field.id) ? (
                                                                    <>
                                                                        <div>
                                                                            <b>{form.getValues(`variant_options.${index}.name`)}</b>
                                                                            <div className="flex gap-2 flex-wrap mt-2">
                                                                                {form.getValues(`variant_options.${index}.value`)?.map((i: any, ii) => (
                                                                                    <div
                                                                                        className="bg-gray-300 rounded-md px-1"
                                                                                        key={ii}>{i.value}</div>
                                                                                ))}
                                                                            </div>

                                                                        </div>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <FormField
                                                                            control={form.control}
                                                                            key={field.id}
                                                                            name={`variant_options.${index}.name`}

                                                                            render={({field}) => (
                                                                                <FormItem>
                                                                                    <FormLabel>Option Name</FormLabel>
                                                                                    <FormControl>
                                                                                        <Select onValueChange={field.onChange} >
                                                                                            <FormControl >
                                                                                                <SelectTrigger>
                                                                                                    <SelectValue placeholder={field.value || "Choose option Name"} />
                                                                                                </SelectTrigger>
                                                                                            </FormControl>
                                                                                            <SelectContent>
                                                                                                {sampleOption.map((i, j) => (
                                                                                                    <SelectItem key={j} value={i}>{i}</SelectItem>
                                                                                                ))}

                                                                                            </SelectContent>
                                                                                        </Select>

                                                                                    </FormControl>
                                                                                    <FormMessage/>
                                                                                </FormItem>
                                                                            )}
                                                                        />

                                                                        <FormField
                                                                            control={form.control}
                                                                            name={`variant_options.${index}.value`}
                                                                            render={({field}) => (
                                                                                <FormItem >
                                                                                    <FormLabel>Option Value</FormLabel>
                                                                                    <FormControl>
                                                                                        <MultipleSelector
                                                                                            {...field}
                                                                                            onChange={(e) => {
                                                                                                field.onChange(e);
                                                                                                // handleChangeOptionValue(e, `variant_options.${index}.value`);
                                                                                            }}
                                                                                            placeholder={renderPlaceHolder(index)}
                                                                                            hidePlaceholderWhenSelected
                                                                                            creatable
                                                                                            loadingIndicator={
                                                                                                <p className="py-2 text-center text-lg leading-10 text-muted-foreground">loading...</p>
                                                                                            }
                                                                                            value={field.value || []}
                                                                                            emptyIndicator={
                                                                                                <p className="w-full text-center text-lg leading-10 text-muted-foreground">
                                                                                                    no results found.
                                                                                                </p>
                                                                                            }

                                                                                        />
                                                                                    </FormControl>
                                                                                    <FormMessage/>
                                                                                </FormItem>
                                                                            )}
                                                                        />
                                                                    </>
                                                                )}


                                                            </div>


                                                        </div>
                                                    )
                                                })}
                                                <Button variant="link" className="p-0" type="button"
                                                        onClick={() => {
                                                            if (fields.length === 0) {
                                                                const currentIndex = form.watch('variant_options').length;
                                                                append({name: "", value: []});


                                                            } else {
                                                                const currentIndex = form.watch('variant_options').length - 1;
                                                                const currentName = form.watch(`variant_options.${currentIndex}.name`);
                                                                const currentValue = form.watch(`variant_options.${currentIndex}.value`);
                                                                if ((currentName.length === 0 || currentValue.length === 0)) {
                                                                    if (currentName.length === 0) {
                                                                        form.setError(`variant_options.${currentIndex}.name`, {
                                                                            type: "custom",
                                                                            message: `name is required`
                                                                        })
                                                                    } else {
                                                                        form.setError(`variant_options.${currentIndex}.value`, {
                                                                            type: "custom",
                                                                            message: `value is required`
                                                                        })
                                                                    }

                                                                } else {
                                                                    form.clearErrors([`variant_options.${currentIndex}.name`, `variant_options.${currentIndex}.value`])
                                                                    append({name: "Choose the option", value: []}, {
                                                                        shouldFocus:false
                                                                    });

                                                                }
                                                            }
                                                        }}
                                                >
                                                    <PlusCircle className="w-4 h-4 mr-2"/> Create Variant</Button>
                                            </div>
                                        </div>



                                       <div>
                                           {form.getValues('variant_options').length > 0 && form.getValues('variant_options')[0].name.length > 0 &&
                                               form.getValues('variant_options')[0].value.length > 0 &&
                                               (
                                                   <CollapsibleTable
                                                       data={form.watch('variant_options')}
                                                       form={form}
                                                   />
                                               )}
                                       </div>
                                    </CardContent>
                                </CardHeader>
                            </Card>
                        </div>
                    </div>
                    <div className="right_side 2xl:col-span-2 space-y-8">
                        <div id="status">
                        <Card>
                                <CardHeader>
                                    <CardTitle>Status</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <FormField
                                        control={form.control}
                                        name="status"
                                        render={({field}) => (
                                            <FormItem>
                                                <Select onValueChange={field.onChange}
                                                        defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue
                                                                placeholder="Select a verified email to display"/>
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="active">Active</SelectItem>
                                                        <SelectItem value="draft">Draft</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                </CardContent>
                            </Card>
                        </div>
                        <div id="organization">
                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        Product organization
                                    </CardTitle>
                                    <CardContent className="p-0 space-y-6">
                                        <FormField
                                            control={form.control}
                                            name="tags"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Tags</FormLabel>
                                                    <FormControl>
                                                        <MultipleSelector
                                                            {...field}
                                                            onChange={field.onChange}
                                                            placeholder="Select or create tags"
                                                            hidePlaceholderWhenSelected
                                                            creatable
                                                            loadingIndicator={
                                                                <p className="py-2 text-center text-lg leading-10 text-muted-foreground">loading...</p>
                                                            }
                                                            value={field.value || []}
                                                            emptyIndicator={
                                                                <p className="w-full text-center text-lg leading-10 text-muted-foreground">
                                                                    no results found.
                                                                </p>
                                                            }
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="collections"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Collections</FormLabel>
                                                    <FormControl>
                                                        <MultipleSelector
                                                            {...field}
                                                            onChange={field.onChange}
                                                            placeholder="Select collections"
                                                            hidePlaceholderWhenSelected
                                                            options={rawCollection.map((i) => {
                                                                return {
                                                                    value: i.id,
                                                                    label: i.name
                                                                }
                                                            })}
                                                            loadingIndicator={
                                                                <p className="py-2 text-center text-lg leading-10 text-muted-foreground">loading...</p>
                                                            }
                                                            value={field.value || []}
                                                            emptyIndicator={
                                                                <p className="w-full text-center text-lg leading-10 text-muted-foreground">
                                                                    no results found.
                                                                </p>
                                                            }
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />

                                    </CardContent>
                                </CardHeader>
                            </Card>
                        </div>
                    </div>
                </form>
            </Form>
        </Shell>
    )
}
