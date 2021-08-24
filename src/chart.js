(function (window) {
    function drawCharts() {
        let charts = {
            drawBar: bar
        }

        async function bar(theData, svg, ...Args) {
            const dates = await theData()
            const height = Args[0].height
            const width = Args[0].width
            const margin = Args[0].margin
            const widthBar = width - margin.left - margin.right;
            const heightBar = height - margin.top - margin.bottom;

            const teams = dates.filter((team) => {
                if (team.Team === 'Nebraska (Big Ten)' || team.Team === 'Illinois (Big Ten)') {
                    return team
                }
            })

            const ranks = Object.keys(teams[0])
                .filter((key) => { return key.includes('Rank') })

            console.log(ranks[0])

            const nebraskaRanks = Object.keys(teams[1])
                .filter((key) => { return key.includes('Rank') })
                .reduce((cur, key) => { return Object.assign(cur, { [key]: teams[1][key] }) }, {})

            const nebraskaArray = Object.entries(nebraskaRanks)[0]
            console.log(nebraskaArray)

            const illinoisRanks = Object.keys(teams[0])
                .filter((key) => { return key.includes('Rank') })
                .reduce((cur, key) => { return Object.assign(cur, { [key]: teams[0][key] }) }, {})

            const illinoisArray = Object.entries(illinoisRanks)[0]

            console.log(nebraskaRanks)
            console.log(illinoisRanks)
            console.log(teams[0])
            console.log(teams[1])

            const xScale = d3.scaleLinear()
                .domain([0, 127])
                .range([0, width])

            const yScale = d3.scaleBand()
                .domain(0, nebraskaArray.map(d => { return d }))
                .range([0, heightBar])
                .padding(0.05)

            console.log(yScale.bandwidth)

            svg
                .attr('width', widthBar + margin.left + margin.right)
                .attr('height', heightBar + margin.top + margin.bottom)
                .style('margin-top', margin.top)
                .style('background', '#fff')
                .append('g')
                .attr('transform', `translate(${margin.left}, ${margin.top})`);

            svg
                .append('g')
                .selectAll('rect')
                .data(nebraskaArray)
                .enter().append('rect')
                .style('fill', 'rgb(83, 157, 204)')
                .style('stroke', '#000')
                .style('stroke-width', '0')
                .attr('height', 30)
                .attr('width', (nebraskaArray) => xScale(nebraskaRanks["Off.Rank"]))
                .attr('y', 0)
                .attr('x', 0 + margin.left)

            // svg
            //     .append('g')
            //     .selectAll('rect')
            //     .data(illinoisArray)
            //     .enter().append('rect')
            //     .style('fill', 'rgb(83, 157, 204)')
            //     .style('stroke', '#000')
            //     .style('stroke-width', '0')
            //     .attr('height', 30)
            //     .attr('width', (illinoisRanks) => xScale((127 - illinoisRanks['Off.Rank'])))
            //     .attr('y', 50)
            //     .attr('x', 0 + margin.left)
        }

        return charts;
    }

    if (typeof window.FootballCharts === 'undefined') {
        window.FootballCharts = drawCharts();
    }

})(window);

export default FootballCharts;
