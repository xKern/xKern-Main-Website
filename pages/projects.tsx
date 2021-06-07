import Meta from '@/components/Meta';
import Page from '@/components/page/Page';

import ProjectsList, { Project } from '@/components/projects/ProjectsList';
import { faGithub, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faDownload, faLink } from '@fortawesome/free-solid-svg-icons';

const ProjectsPage = () => {
  const projects: Project[] = [
    {
      name: 'K-nav',
      subtitle: 'Under Development',
      description: 'Redefining modern navigation solutions. Public transportation and digital payments at your fingertips. Find your buses, buy tickets and live-track buses from anywhere',
      image: '/images/projects/knav.jpg',
      underDevelopment: true
    },

    {
      name: 'ReLive',
      subtitle: 'Under Development',
      description: 'Medical aid anytime anywhere. Consult doctors from your home, get medicines, emergency services and connect with various medical services easily.',
      image: '/images/projects/relive.png',
      underDevelopment: true
    },

    {
      name: 'PrivacyTools',
      subtitle: 'Proecting iOS users',
      description: 'Protect your privacy on iOS devices by restricting how apps access permissions given to them, like contacts, camera, photos and microphone',
      image: '/images/projects/privtools.jpg',
      links: [
        {
          icon: faGithub,
          url: 'https://github.com/arx8x/PrivacyTools/'
        },
        {
          icon: faYoutube,
          url: 'https://twitter.com/ARX8x/status/1271590611129253888'
        },
        {
          icon:faLink,
          url:  'https://www.reddit.com/r/jailbreak/comments/hdkxo2/beta_privacytools_control_how_apps_access_your/'
        },
        {
          icon: faDownload,
          url: 'https://apt.arx8x.net/net.arx8x.privacytools_0.2.2_iphoneos-arm.deb'
        },
      ]
    },

    {
      name: 'System Info',
      subtitle: '270k downloads',
      description: 'Get extensive information on your iOS device, see detailed battery usage stats and access to many other areas of iOS you normally can\'t access.',
      image: '/images/projects/systeminfo1.jpg',
      links: [
        {
          icon: faGithub,
          url: 'https://github.com/arx8x/SystemInfo'
        },
        {
          icon: faYoutube,
          url: 'https://www.youtube.com/watch?v=cyctmrWGmME'
        },
        {
          icon: faDownload,
          url: 'https://apt.arx8x.net/xyz.xninja.systeminfo_2.7.2-1_iphoneos-arm.deb'
        },
        {
          icon: faLink,
          url: 'https://arx8x.net/cydia?source=https://apt.arx8x.net'
        }
      ]
    },

    {
      name: 'SHSH Host',
      subtitle: '720k Tickets, 110k Devices',
      description: 'iOS APTicket manager application and web version. Manage and sign APTickets for you iOS devices without having to manually input information',
      image: '/images/projects/shshhost.jpeg',
      links: [
        {
          icon: faGithub,
          url: 'https://github.com/arx8x/SHSH-Host/'
        },
        {
          icon: faYoutube,
          url: 'https://cdn.discordapp.com/attachments/685997840064839730/686068072838070310/video0.mov'
        },
        {
          icon: faLink,
          url: 'https://shsh.host/'
        }
      ]
    },

    {
      name: 'iOS Bot',
      subtitle: 'Over 110k active users',
      description: 'Telegram bot for helping with various tasks associated with iOS devices, like firmware downloads, finding apps and restoring software',
      image: '/images/projects/iosbot.jpg',
      links: [
        {
          icon: faLink,
          url: 'https://t.me/rjailbreakbot'
        }
      ]
    },

    {
      name: 'xLib 1.0',
      subtitle: 'Under Development',
      description: 'High level C APIs for developers. Makes it easy to perform some tasks with C using the library a developer can statically link on projects',
      image: '/images/projects/xlib.png',
      underDevelopment: true
    },

    {
      name: 'Aura Ping',
      subtitle: 'Under Development',
      description: 'RGB notifications on all Aura Synced devices that support Asus Aura RGB. Notifications are relayed through local network from a mobile device',
      image: '/images/projects/auraping.png',
      underDevelopment: true
    }
  ];

  return (
    <Page title="Projects" subtitle="Check out some of our projects!">
      <Meta
        title="Projects"
        description="Check out the software and services xKern has built so far."
        url="/projects"
      />

      <ProjectsList projects={projects} />
    </Page>
  );
};

export default ProjectsPage;
