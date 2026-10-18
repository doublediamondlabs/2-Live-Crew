(function(root){
function forecast(r,start,plannedStart=start){
 const stops=r.stops;let last=-1,prevTime=start,prevMile=0;const segments=[],flags=[];
 for(let i=0;i<stops.length;i++){
 const s=stops[i];if(!s.arrival)break;const a=Date.parse(s.arrival),m=s.mile-prevMile;
 if(m>0){const minutes=(a-prevTime)/60000,p=minutes/m;const accepted=segments.filter(x=>x.use),recent=accepted.slice(-3),ref=recent.length?recent.reduce((n,x)=>n+x.minutes,0)/recent.reduce((n,x)=>n+x.distance,0):r.pace;
 const unusual=!Number.isFinite(p)||p<=0||p<ref*0.65||p>ref*1.5;const reviewed=s.splitReview==='include',excluded=s.splitReview==='exclude';const use=Number.isFinite(p)&&p>0&&!excluded&&(!unusual||reviewed);
 segments.push({index:i,distance:m,minutes,pace:p,use});
 if(excluded||unusual&&!reviewed)flags.push({index:i,pace:p,reference:ref,excluded,reason:excluded?'Excluded by crew':'Unusual compared with recent pace'});
 }prevTime=s.departure?Date.parse(s.departure):a;prevMile=s.mile;last=i;
 }
 const usable=segments.filter(x=>x.use),recent=usable.slice(-3);const weighted=xs=>xs.reduce((n,x)=>n+x.minutes,0)/xs.reduce((n,x)=>n+x.distance,0);
 const avg=usable.length?weighted(usable):r.pace,observed=recent.length?weighted(recent):r.pace,pace=r.override||observed;
 let time=last>=0?(stops[last].departure?Date.parse(stops[last].departure):Date.parse(stops[last].arrival)+stops[last].minutes*60000):start;
 let mile=last>=0?stops[last].mile:0,base=plannedStart,bm=0;
 const rows=stops.map((s,i)=>{base+=(s.mile-bm)*r.pace*60000;const planned=base;base+=s.minutes*60000;bm=s.mile;
 if(i<=last)return {...s,planned,eta:Date.parse(s.arrival)};
 time+=(s.mile-mile)*pace*60000;const eta=time;time+=s.minutes*60000;mile=s.mile;return {...s,planned,eta};});
 return {rows,pace,avg,last,flags,segments,next:rows[last>=0&&!stops[last].departure?last:last+1],elapsed:last>=0&&stops[last].mile>0?(Date.parse(stops[last].arrival)-start)/60000/stops[last].mile:null};
}
if(typeof module!=='undefined')module.exports={forecast};else root.forecast=forecast;
})(typeof window!=='undefined'?window:globalThis);
