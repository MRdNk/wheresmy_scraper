var config = {
  pages: {
    services: {
      url: 'http://travelplus.acislive.com/style/pages/services.asp',
      selector: '$(\'.Section1\')'
    },
    service: {
      url: 'http://travelplus.acislive.com/web/public_service.asp?service={{serviceNo}}', 
      selector: '$(\'#Table1\')'
    }
  }
};