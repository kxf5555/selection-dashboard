import React,{useState,useEffect} from 'react';
import {Card,CardContent} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Table,TableHeader,TableRow,TableHead,TableBody,TableCell} from '@/components/ui/table';

interface Product{title:string;sku:string;price:number;imageUrl:string}
interface Kpi{label:string;value:string}

export default function Dashboard(){
  const[products,setProducts]=useState<Product[]>([]);
  const[kpis,setKpis]=useState<Kpi[]>([]);
  const[csv,setCsv]=useState<File|null>(null);

  useEffect(()=>{
    fetch('/data/products.json').then(r=>r.ok?r.json():[]).then(setProducts).catch(()=>{});
  },[]);

  useEffect(()=>{
    if(products.length){
      const avg=(products.reduce((s,p)=>s+p.price,0)/products.length).toFixed(2);
      setKpis([{label:'SKU数',value:String(products.length)},{label:'平均批价',value:`¥${avg}`}]);
    }
  },[products]);

  const parseCsv=(text:string)=>{
    const [headerLine,...rows]=text.trim().split(/\r?\n/);
    const headers=headerLine.split(',');
    const list:Product[]=rows.map(r=>{const c=r.split(',');return{title:c[headers.indexOf('title')],sku:c[headers.indexOf('sku')],price:parseFloat(c[headers.indexOf('price')]),imageUrl:c[headers.indexOf('imageUrl')]}});setProducts(list);
  }

  const handleImport=()=>{
    if(!csv) return;
    const reader=new FileReader();
    reader.onload=e=>parseCsv(e.target?.result as string);
    reader.readAsText(csv,'utf-8');
    setCsv(null);
  }

  return(
    <div className='min-h-screen p-6 space-y-8'>
      <header className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>选品评估仪表盘</h1>
        <div className='flex gap-3'>
          <label className='cursor-pointer'>
            <Input type='file' accept='.csv' className='hidden' onChange={e=>setCsv(e.target.files?.[0]||null)}/>
            <Button variant='secondary'>导入CSV</Button>
          </label>
          <Button onClick={handleImport} disabled={!csv}>处理</Button>
        </div>
      </header>
      <section className='grid sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        {kpis.map(k=><Card key={k.label}><CardContent><p className='text-sm text-gray-500'>{k.label}</p><p className='text-xl font-bold'>{k.value}</p></CardContent></Card>)}
      </section>
      <section className='bg-white rounded-2xl shadow p-4'>
        <h2 className='text-lg font-medium mb-4'>商品列表</h2>
        <div className='overflow-auto'>
          <Table>
            <TableHeader><TableRow><TableHead>SKU</TableHead><TableHead>标题</TableHead><TableHead>批价</TableHead><TableHead>图片</TableHead></TableRow></TableHeader>
            <TableBody>
              {products.map(p=><TableRow key={p.sku}><TableCell>{p.sku}</TableCell><TableCell>{p.title}</TableCell><TableCell>¥{p.price}</TableCell><TableCell><img src={p.imageUrl} className='w-10'/></TableCell></TableRow>)}
            </TableBody>
          </Table>
        </div>
      </section>
    </div>
  );
}
