"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { ReloadIcon } from "@radix-ui/react-icons";
import { checkIdPermissionBelongWith, groupByPermissions } from "@/lib/helpers";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckedState } from "@radix-ui/react-menu";
import { UseFormReturn } from "react-hook-form";
import { useMounted } from "@/hooks/use-mounted";

type CheckboxAll = "indeterminate" | true | false;

interface RoleFormProps {
  form: UseFormReturn<any>;
}

export function RoleForm2({
  form,
  submitHandler,
  permissions,
  status,
  createRoleStt,
  reset,
  submitStt,
  mode,
}: any) {
 
    const [selectAll, setSelectAll] = React.useState<boolean>(false);
    const [checkedMethods, setCheckedMethods] = React.useState<string[]>([])
  
  
    const memoFormPermission = React.useMemo(() => {
    return form.getValues("permissions");
  }, [form.watch("permissions")]);

  const newPermissions = React.useMemo(() => {
    return groupByPermissions(permissions?.data);
  }, [permissions]);


  const handleSelectAll = (event: any) => {
    if (event) {
      form.setValue(
        "permissions",
        permissions?.data?.map((i: any) => i._id)
      );
      setSelectAll(true);
    } else {
      form.setValue("permissions", []);
      setSelectAll(false);
    }
  };

  const handleSingleChange = (e: any, m: any) => {
    if (e) {
      form.setValue("permissions", [...memoFormPermission, m]);
    } else {
      const filterSingle = memoFormPermission.filter((i) => i !== m);
      form.setValue("permissions", filterSingle);
    }
  };

  console.log("memoFormPermission",memoFormPermission)

  const handleChooseMethods = (e: any, m: any) => {
    const inputs = document.querySelectorAll(`button[data-method='${m}']`);
        const data = [] as any[]
        if(e) {
            inputs.forEach((e) => {
                const value = e.getAttribute("data-id");
                setCheckedMethods([...checkedMethods,m]);
                data.push(value)
            });
        
            const flatmap =  [...memoFormPermission,...data].flatMap((i) => i);
            form.setValue("permissions",flatmap);
        }else{
            inputs.forEach((e) => {
                const value = e.getAttribute("data-id")
                data.push(value)
            });
           const filterMethods = checkedMethods?.filter((i) => i!== m);
            setCheckedMethods(filterMethods);
            const clearPers = memoFormPermission.filter((i:any) => !data?.some((j:any) => j == i));
            form.setValue("permissions", clearPers);
        }
        
  }



  React.useEffect(() => {
    if (memoFormPermission.length === permissions?.data?.length) {
      setSelectAll(true);
      setCheckedMethods(permissions.namePer)
      
    } else {
      setSelectAll(false);
      setCheckedMethods([])
    }

    

  }, [memoFormPermission]);

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {permissions && (
            <>
              <div className="check_all_section flex flex-column items-center space-x-2">
                <label
                  htmlFor="checkall"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Check All
                </label>
                <Checkbox
                  id="checkall"
                  onCheckedChange={handleSelectAll}
                  checked={selectAll}
                />
              </div>

              <FormField
                control={form.control}
                name="permissions"
                render={({ field }) => (
                  <FormItem>
                    <Table className="table w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <TableHeader className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
                        <TableRow>
                          <TableHead></TableHead>
                          {permissions.namePer?.map((i: any, j: any) => (
                            <TableHead key={j}>
                              <div className="check_all_section grid gap-2">
                                <label
                                  htmlFor="checkall"
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  {i}
                                </label>
                                <Checkbox id={i}
                                 data-method_selector={i} 
                                 checked={checkedMethods?.includes(i)}
                                    onCheckedChange={(e) => handleChooseMethods(e,i)}
                            
                                />
                              </div>
                            </TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>

                      <TableBody>
                        {newPermissions &&
                          newPermissions?.map((i, j) => {
                            const name = Object.keys(i) as any;
                            return (
                              <TableRow key={`${j}.${name}`}>
                                <TableCell className="font-bold">
                                  {name}
                                </TableCell>
                                {name &&
                                  i[name]?.map((o: any, jj) => {
                                    return (
                                      <React.Fragment
                                        key={`${jj}.${o?._id}.${o?.name}.${j}`}
                                      >
                                        {o !== null ? (
                                          <TableCell
                                            key={`${jj}.${o?._id}.${o?.name}`}
                                          >
                                            <FormField
                                              key={o._id}
                                              control={form.control}
                                              name="permissions"
                                              render={({ field }) => {
                                                return (
                                                  <FormItem
                                                    key={o._id}
                                                    className="flex flex-row items-start space-x-2 space-y-0 w-28 max-w-28  overflow-ellipsis truncate  "
                                                  >
                                                    <FormControl>
                                                      <Checkbox
                                                        data-id={o._id}
                                                        data-method={o.name.split('.')?.at(-1)}
                                                        data-name={o.name}
                                                        checked={field.value?.includes(
                                                          o._id
                                                        )}
                                                        onCheckedChange={(e) =>
                                                          handleSingleChange(
                                                            e,
                                                            o._id
                                                          )
                                                        }
                                                      />
                                                    </FormControl>
                                                  </FormItem>
                                                );
                                              }}
                                            />
                                          </TableCell>
                                        ) : (
                                          <>
                                            <td key={jj} className="p-2">
                                              <Checkbox disabled={true} />
                                            </td>
                                          </>
                                        )}
                                      </React.Fragment>
                                    );
                                  })}
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </FormItem>
                )}
              />
            </>
          )}

          <Button
            type="submit"
            disabled={createRoleStt === "pending" || status === "pending"}
          >
            {createRoleStt === "pending" ? (
              <>
                {" "}
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </Form>
    </>
  );
}
