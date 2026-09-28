'use strict';
(function(root){
  const points=[];
  for(let y=-2;y<=6;y++)for(let x=0;x<=4;x++)if((y>=0&&y<=4)||(y===-2||y===6?[0,2,4].includes(x):[1,2,3].includes(x)))points.push({x,y,label:String.fromCharCode(65+x)+(y+3)});
  const at=(x,y)=>points.findIndex(p=>p.x===x&&p.y===y);
  const edges=[],adj=points.map(()=>[]);
  function connect(a,b){if(a<0||b<0||adj[a].includes(b))return;edges.push([a,b]);adj[a].push(b);adj[b].push(a);}
  for(let y=0;y<=4;y++)for(let x=0;x<=4;x++){if(x<4)connect(at(x,y),at(x+1,y));if(y<4)connect(at(x,y),at(x,y+1));if((x+y)%2===0&&y<4)for(const dx of [-1,1])if(x+dx>=0&&x+dx<=4)connect(at(x,y),at(x+dx,y+1));}
  for(const [tip,sign] of [[0,-1],[4,1]]){
    for(const dx of [-1,0,1]){connect(at(2,tip),at(2+dx,tip+sign));connect(at(2+dx,tip+sign),at(2+2*dx,tip+2*sign));}
    connect(at(1,tip+sign),at(2,tip+sign));connect(at(2,tip+sign),at(3,tip+sign));connect(at(0,tip+2*sign),at(2,tip+2*sign));connect(at(2,tip+2*sign),at(4,tip+2*sign));
  }
  const jumps=points.map((p,a)=>adj[a].flatMap(b=>adj[b].filter(c=>{const q=points[b],r=points[c],dx=q.x-p.x,dy=q.y-p.y,ex=r.x-q.x,ey=r.y-q.y;return dx*ey===dy*ex&&dx*ex+dy*ey>0;}).map(c=>({from:a,to:c,capture:b}))));
  function initial(){return points.map(p=>p.y<2?-1:p.y>2?1:0);}
  function moves(board,from,capturesOnly=false){const player=board[from];if(!player)return [];const captures=jumps[from].filter(m=>board[m.capture]===-player&&board[m.to]===0);return capturesOnly?captures:[...adj[from].filter(to=>!board[to]).map(to=>({from,to,capture:null})),...captures];}
  function apply(board,move){const next=board.slice();next[move.to]=next[move.from];next[move.from]=0;if(move.capture!==null)next[move.capture]=0;return next;}
  function hasMove(board,player){return board.some((p,i)=>p===player&&moves(board,i).length);}
  function winner(board,nextPlayer){if(!board.includes(nextPlayer)||!hasMove(board,nextPlayer))return -nextPlayer;return 0;}
  function actions(board,player){const list=[];function chain(state,from,path){for(const move of moves(state,from,true)){if(list.length>=300)return;const next=apply(state,move),steps=[...path,move];list.push({board:next,steps});chain(next,move.to,steps);}}board.forEach((p,i)=>{if(p!==player)return;for(const m of moves(board,i).filter(m=>m.capture===null))list.push({board:apply(board,m),steps:[m]});chain(board,i,[]);});return list;}
  function evaluate(board,player){let score=0;board.forEach((p,i)=>{if(!p)return;const sign=p===player?1:-1;score+=sign*(100+adj[i].length*1.5+(4-Math.abs(points[i].y-2))*1.5);});return score;}
  function choose(board,player){const options=actions(board,player);let best=null,bestScore=-Infinity;for(const option of options){let score;if(winner(option.board,-player)===player)score=100000;else{score=Infinity;for(const reply of actions(option.board,-player)){const value=winner(reply.board,player)===-player?-100000:evaluate(reply.board,player);score=Math.min(score,value);}if(score===Infinity)score=100000;}score+=Math.min(option.steps.length,16)*.01;if(score>bestScore){bestScore=score;best=option;}}return best;}
  const api={points,edges,adj,jumps,at,initial,moves,apply,hasMove,winner,actions,choose};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.Bead16=api;
})(typeof globalThis!=='undefined'?globalThis:this);
