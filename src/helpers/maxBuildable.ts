
export const maxBuildable = (data,costs,id:string)=>{
      let factor = 0;
      if (data[id].costType == "EXPONENTIAL") factor = 1.1;
      else if (data[id].costType == "DYSON") factor = 1.02;
      else if (data[id].costType == "DOUBLE") factor = 2;

      return costs.reduce((acc,cost)=>{
          if(acc===0) return 0;
        const max = Math.floor(
          Math.log((data[cost.id].count * (factor - 1)) / cost.count + 1) /
            Math.log(factor)
        );
        if(max<acc) return max;
        return acc;
      },1000000);
    };
