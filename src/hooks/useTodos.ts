import { useMemo, useState } from 'react';
import { useLocalStorage } from './useLocalStorage';
export type Todo={id:string;title:string;description:string;done:boolean;createdAt:number};
const KEY='todo.items.v1';
export function useTodos(){
 const [todos,setTodos]=useLocalStorage<Todo[]>(KEY,[]); const [selectedId,setSelectedId]=useState<string|null>(null);
 const sorted=useMemo(()=>[...todos].sort((a,b)=>b.createdAt-a.createdAt),[todos]);
 const selected=sorted.find(t=>t.id===selectedId)??null;
 const add=(title:string,description='')=>{const t:Todo={id:crypto.randomUUID?.()??String(Date.now()),title:title.trim(),description:description.trim(),done:false,createdAt:Date.now()};setTodos(p=>[...p,t]);setSelectedId(t.id)};
 const update=(id:string,patch:Partial<Pick<Todo,'title'|'description'|'done'>>)=>setTodos(p=>p.map(t=>t.id===id?{...t,...patch}:t));
 const remove=(id:string)=>{setTodos(p=>p.filter(t=>t.id!==id));setSelectedId(p=>p===id?null:p)};
 return {todos:sorted,selected,selectedId,setSelectedId,add,update,remove};
}
